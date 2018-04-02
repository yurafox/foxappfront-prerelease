import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../app/model/product';
import {ComponentBase} from '../component-extension/component-base';
import {PopoverController} from 'ionic-angular';
import {FilterPopoverPage} from '../../pages/filter-popover/filter-popover';
import {Prop, Manufacturer} from '../../app/model/index';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {SearchService, SortOrderEnum} from '../../app/service/search-service';
import {ProductPropValue} from '../../app/model/product-prop-value';

class MnfFilterStruct {
  constructor(public mnf: Manufacturer,
              public count: number,
              public isChecked: boolean) {
  }
}

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

export class PropFilterCondition {
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
export class FilterComponent extends  ComponentBase {

  //@Input() filteredProducts: Product[];

  @Input() srch: SearchService;

  fCategories = new Array<FilterCategory>();

  public dataInitialized = false;

  filteredProps: PropsFilterStruct[];
  public filteredManufacturers: MnfFilterStruct[];

  propFilterConditionArray = new Array<PropFilterCondition>();
  mnfFilterCondition = [];

  async initData() {
    this.filteredProps = [];
    this.filteredManufacturers = [];
    this.fCategories = [];
    this.initFilterProps(this.srch.products);

    await this.initFilterManufacturers();
    this.initFilter();
    this.fCategories.sort((a, b) => {return (a.sortOrder - b.sortOrder)});
  }

  async resetFilter() {
    await this.initData();
    this.srch.prodSrchParams.productProps = this.propFilterConditionArray;
    this.srch.prodSrchParams.supplier = this.mnfFilterCondition;
    this.srch.searchGeneral();
  }

  constructor(public popoverCtrl: PopoverController, public repo: AbstractDataRepository) {
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

  async initFilterManufacturers() {
    this.mnfFilterCondition = [];

    /* Старый фильтр, основанный на переборе отфильтрованного массива продуктов
    for (let p of this.srch.products) {
      const i = this.filteredManufacturers.findIndex(z => (z.mnf.id == p.manufacturerId));
      if (i !== -1)
        this.filteredManufacturers[i].count++;
      else {
        let mnf = new MnfFilterStruct(await this.repo.getManufacturerById(p.manufacturerId), 1, false);
        if (mnf.mnf.name)
          this.filteredManufacturers.push(mnf);
      }
    }
    */

    // Новый фильтр, на агрегатах ES
    this.srch.aggs.mnfAgg.buckets.forEach(
      x => {
        const mnfId = x.key.substring(0, x.key.indexOf('|'));
        const mnfName = x.key.substring(x.key.indexOf('|')+1, x.key.length);

        const mnf = new Manufacturer(mnfId, mnfName);
        let mnfFlt = new MnfFilterStruct(mnf, x.doc_count, false);
        this.filteredManufacturers.push(mnfFlt);
      }
    );

    /* Убираем сортировку. Выводим по убыванию кол-ва документов
    this.filteredManufacturers.sort((a, b) => (a.mnf.name.localeCompare(b.mnf.name)));
    */


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

    /*
    prodArray.forEach(p => {
      p.props.forEach(a => {
        if ((a.out_bmask & 2) === 2) {
          const i = this.filteredProps.findIndex(z => ((z.prop.id === a.id_Prop.id)
                                                                    && (z.value == a.pVal)));
          if (i !== -1)
            this.filteredProps[i].count++;
          else {
            const pt = new PropsFilterStruct(a.id_Prop, a.pVal, 1, false, null, (a.id_Prop.prop_type == 4) ? a.prop_Value_Enum.list_Index : null);
            this.filteredProps.push(pt);
          }
        }
      });
    });
    */


    this.srch.aggs.propsAgg.idProp.buckets.forEach(
      x => {
        const start_pos = x.key.indexOf('|');
        const end_pos = x.key.indexOf('|', start_pos+1);

        const propId = parseInt(x.key.substring(0, start_pos));
        const propName = x.key.substring(start_pos+1, end_pos);
        const propBMask = parseInt(x.key.substring(end_pos+1, x.key.length));

        if ((propBMask & 2) === 2) {
          const prop = new Prop (propId, propName, -1);
          x.propVal.buckets.forEach(
            y => {
              const pt = new PropsFilterStruct(prop, y.key, y.doc_count, false, null);
              this.filteredProps.push(pt);
            }
          );
        }
      }
    );

    /*
    this.filteredProps.sort((x, y) => {
      if (x.prop.name.localeCompare(y.prop.name) == 0) {
        if (x.prop.prop_type == 4)
          return (x.listIndex - y.listIndex);
        else
          return x.value.toString().localeCompare(y.value.toString());
      } else
        return x.prop.name.localeCompare(y.prop.name);
    });
    */

    // Заполняем значение название предыдущей группы для создания закладок с названиями групп
    let prevName = null;
    for (let i = 0; i < this.filteredProps.length; i++) {
      this.filteredProps[i].prevPropName = prevName;
      prevName = this.filteredProps[i].prop.name;
    }
  }

  onPropsClick(data) {
    let cond = new PropFilterCondition(data.prop.id, data.value);
    let i = this.propFilterConditionArray
          .findIndex(z => ((z.propId === data.prop.id) && (z.propVal == data.value)));
    if ((data.isChecked))
      this.propFilterConditionArray.splice(i, 1);
    if ((i == -1) && (!data.isChecked))
      this.propFilterConditionArray.push(cond);
    this.srch.prodSrchParams.productProps = this.propFilterConditionArray;
    this.srch.searchGeneral();
  }

  onMnfClick(mnf) {
    let i = this.mnfFilterCondition.indexOf(mnf.mnf.id);
    if ((i !== -1))
      this.mnfFilterCondition.splice(i, 1);
    if ((i == -1) && (!mnf.isChecked))
      this.mnfFilterCondition.push(mnf.mnf.id);
    this.srch.prodSrchParams.supplier = this.mnfFilterCondition;
    this.srch.searchGeneral()
  }

  async showFilter(event: any) {
    if (!this.dataInitialized) {
      /*
      for (let p of this.filteredProducts) {
        this.baseProducts.push(p);
      }
      */
      this.dataInitialized = true;
      await this.initData();
    }

    for (let i of this.fCategories) {
      i.isOpened = false;
    }

    let popover = this.popoverCtrl.create(FilterPopoverPage, {filterControl: this});
    popover.present({
      ev: event
    });
  }

  sortByPriceAsc() {
    this.srch.prodSrchParams.sortOrder = SortOrderEnum.PriceLowToHigh;
    this.srch.searchGeneral();
  };

  sortByPriceDesc() {
    this.srch.prodSrchParams.sortOrder = SortOrderEnum.PriceHighToLow;
    this.srch.searchGeneral();
  };

  sortByRating() {
    this.srch.prodSrchParams.sortOrder = SortOrderEnum.Rating;
    this.srch.searchGeneral();
  };

  sortByRelevance() {
    this.srch.prodSrchParams.sortOrder = SortOrderEnum.Relevance;
    this.srch.searchGeneral();
  };

}
