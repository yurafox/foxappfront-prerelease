import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../app/model/product';
import {ComponentBase} from '../component-extension/component-base';
import {PopoverController} from 'ionic-angular';
import {FilterPopoverPage} from '../../pages/filter-popover/filter-popover';
import {Prop, Manufacturer} from '../../app/model/index';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {SearchService} from '../../app/service/search-service';

class MnfFilterStruct {
  constructor(public mnf: Manufacturer,
              public count: number,
              public isChecked: boolean) {
  }
}

/*class FilterObj {
  constructor(
    public isChecked: boolean = false,
    public name: string
  ){}
}*/

class PropsFilterStruct {
  constructor(public prop: Prop,
              public value: any,
              public count: number,
              public isChecked: boolean,
              public prevPropName?: string,
              public listIndex?: number,
              public isOpened:boolean = false) {
  }
}

class PropFilterCondition {
  constructor(
    public propId: number,
    public propVal: string
  ){}
}

class FilterItem {
  constructor(
    public id: number,
    public name: string,
    public isChecked?: boolean,
    public count?: number,
    public type?: string,
    public item?: any
  ){}
}

class FilterCategory {
  constructor (public catName: string,
                public items?: FilterItem[],
                public isOpened: boolean = false,
                public sortOrder?: number) {}

  public get filterExpr(): string {
    let exp = '';
    const delim = ', ';

    for (let item of this.items) {
      if (item.isChecked)
        exp = exp + item.name + delim;
    }
    if (!(exp === ''))
      exp = exp.substr(0, exp.length-2);
    return exp;
  }
}

@Component({
  selector: 'filter',
  templateUrl: 'filter.html'
})
export class FilterComponent extends  ComponentBase implements OnInit {

  @Input() filteredProducts: Product[];

  @Input() parentComponent: any;

  fCategories = new Array<FilterCategory>();

  baseProducts = new Array<Product>();
  //initialProducts = new Array<Product>();
  public dataInitialized = false;

  filteredProps: PropsFilterStruct[];
  public filteredManufacturers: MnfFilterStruct[];

  propFilterConditionArray = new Array<PropFilterCondition>();
  mnfFilterCondition = [];

  async initData() {
    this.filteredProducts = [];
    this.filteredProps = [];
    this.filteredManufacturers = [];
    this.fCategories = [];
    this.initFilterProps(this.baseProducts);

    await this.initFilterManufacturers();
    this.initFilter();
    this.fCategories.sort((a, b) => {return (a.sortOrder - b.sortOrder)});
    this.filterRun();
  }

  async resetFilter() {
    this.parentComponent.products = [];
    for (let p of this.baseProducts) {
      this.parentComponent.products.push(p);
    }
    await this.initData();
  }

  constructor(public popoverCtrl: PopoverController, public repo: AbstractDataRepository,
              public srchService: SearchService) {
    super();
  }

  initFilter() {
    this.propFilterConditionArray = [];
    //////// Props ///////
    let fItems = null;
    let fCat = null;
    this.filteredProps.forEach(p => {
      if (!(p.prop.name == p.prevPropName) || !(p.prevPropName)) {
        fCat = new FilterCategory(p.prop.name);
        fItems = new Array<FilterItem>();
      }

      fItems.push(new FilterItem(p.prop.id, p.value, false, p.count, 'prop', p));

      if (!(p.prop.name == p.prevPropName)) {
        fCat.items = fItems;
        fCat.sortOrder = 10;
        this.fCategories.push(fCat);
      };
    });
    ///////// Sort ////////
    fItems = new Array<FilterItem>();
    fItems.push(new FilterItem(-1, 'Relevance', true, 0, 'sort', null));
    fItems.push(new FilterItem(0, 'Price: Low to High', false, 0, 'sort', null));
    fItems.push(new FilterItem(1, 'Price: High to Low', false, 0, 'sort', null));
    fItems.push(new FilterItem(2, 'Rating', false, 0, 'sort', null));
    fCat = new FilterCategory('Sort', fItems, false, 3);
    this.fCategories.push(fCat);
  }

  async ngOnInit() {
    super.ngOnInit();
  }

  async initFilterManufacturers() {
    this.mnfFilterCondition = [];
    for (let p of this.baseProducts) {
      const i = this.filteredManufacturers.findIndex(z => (z.mnf.id == p.manufacturerId));
      if (i !== -1)
        this.filteredManufacturers[i].count++;
      else {
        let mnf = new MnfFilterStruct(await this.repo.getManufacturerById(p.manufacturerId), 1, false);
        this.filteredManufacturers.push(mnf);
      }
    }
    this.filteredManufacturers.sort((a, b) => (a.mnf.name.localeCompare(b.mnf.name)));

    ////////////Заполняем модель формьі фильтра брендами////////////////
    let mnfAr = new Array<FilterItem>();
    for (let m of this.filteredManufacturers) {
      mnfAr.push(new FilterItem(m.mnf.id, m.mnf.name, false, m.count, 'mnf', m));
    }
    this.fCategories.push(new FilterCategory('Brand', mnfAr, false, 5));
    ////////////////////////////////////////////////////////////////////
  }

  initFilterProps(prodArray: Product[]) {
    this.filteredProps.length = 0;
    prodArray.forEach(p => {
      p.Props.forEach(a => {
//        if (a.id_Prop. predestination>0) {
        // Вьіводим только св-ва для фильтра
        if ((a.out_bmask & 2) === 2) {
          const i = this.filteredProps.findIndex(z => ((z.prop.id === a.id_Prop.id)
                                                                    && (z.value == a.value)));
          if (i !== -1)
            this.filteredProps[i].count++;
          else {
            const pt = new PropsFilterStruct(a.id_Prop, a.value, 1, false, null, (a.id_Prop.prop_type == 4) ? a.prop_Value_Enum.list_Index : null);
            this.filteredProps.push(pt);
          }
        }
      });
    });

    this.filteredProps.sort((x, y) => {
      if (x.prop.name.localeCompare(y.prop.name) == 0) {
        if (x.prop.prop_type == 4)
          return (x.listIndex - y.listIndex);
        else
          return x.value.toString().localeCompare(y.value.toString());
      } else
        return x.prop.name.localeCompare(y.prop.name);
    });
    // Заполняем значение название предыдущей группы для создания закладок с названиями групп
    let prevName = null;
    for (let i = 0; i < this.filteredProps.length; i++) {
      this.filteredProps[i].prevPropName = prevName;
      prevName = this.filteredProps[i].prop.name;
    }
  }

  filterRun() {
    this.filteredProducts.length = 0;
    this.baseProducts.forEach(p => {
        if (
          (this.filterByPrice(p, null, null/*this.startPriceFilterCondition, this.endPriceFilterCondition*/))
          &&
          (this.filterByManufacturer(p, this.mnfFilterCondition))
          &&
          (this.filterByPropertyValue(p, this.propFilterConditionArray))
        )
          this.filteredProducts.push(p);
      }
    );
    this.parentComponent.products = this.filteredProducts;
  }

  onPropsClick(data) {
    let cond = new PropFilterCondition(data.prop.id, data.value);
    let i = this.propFilterConditionArray
          .findIndex(z => ((z.propId === data.prop.id) && (z.propVal == data.value)));
    if ((data.isChecked))
      this.propFilterConditionArray.splice(i, 1);
    if ((i == -1) && (!data.isChecked))
      this.propFilterConditionArray.push(cond);
    this.filterRun();
  }

  onMnfClick(mnf) {
    let i = this.mnfFilterCondition.indexOf(mnf.mnf.id);
    if ((i !== -1))
      this.mnfFilterCondition.splice(i, 1);
    if ((i == -1) && (!mnf.isChecked))
      this.mnfFilterCondition.push(mnf.mnf.id);
    //this.propFilterConditionArray.length = 0;
    //this.initFilterProps(this.baseProducts);
    this.filterRun();
  }


  filterByPrice(product: Product, startPrice: number, endPrice: number): boolean {
    //return ((product.price >= startPrice) && (product.price <= endPrice));
    return true;
  }


  filterByManufacturer(product: Product, mnfArray: number[]): boolean {
    return ((mnfArray.length == 0) || (mnfArray.includes(product.manufacturerId)));
  }

  filterByPropertyValue(product: Product, propsArray: PropFilterCondition[]): boolean {
    if (propsArray.length == 0) return true;

    let occur = 0;
    propsArray.forEach(x => {
      let fnd = product.Props.find(y => {return ((y.id_Prop.id === x.propId) && (y.value === x.propVal));});
      if (fnd)
        occur++;
    });

    return (occur === propsArray.length);

  }

  async showFilter(event: any) {

    if (!this.dataInitialized) {
      for (let p of this.filteredProducts) {
        this.baseProducts.push(p);
      }
      this.dataInitialized = true;
      await this.initData();
    }

    for (let i of this.fCategories) {
      i.isOpened = false;
    }

    let popover = this.popoverCtrl.create(FilterPopoverPage, {filterControl: this});
//    (<any>popover).filter = this;
    popover.present({
      ev: event
    });
  }

  sortByPriceAsc() {
    this.filteredProducts.sort((a, b) =>
      {return (a.price - b.price)}
    );
  };

  sortByPriceDesc() {
    this.filteredProducts.sort((a, b) =>
      {return (b.price - a.price)}
    );

  };

  sortByRating() {
    this.filteredProducts.sort((a, b) =>
      {return (b.rating - a.rating)}
    );
  };

  sortByRelevance() {
    this.filterRun();
  };

}
