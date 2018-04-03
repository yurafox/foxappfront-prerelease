import {Component, Input, OnInit} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {PopoverController} from 'ionic-angular';
import {FilterPopoverPage} from '../../pages/filter-popover/filter-popover';
import {Prop, Manufacturer} from '../../app/model/index';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {SearchService, SortOrderEnum} from '../../app/service/search-service';

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
  constructor (
    public id: number,
    public type: string,
    public catName: string,
    public items?: FilterItem[],
    public isOpened: boolean = false,
    public sortOrder?: number,
  ) {}

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
  @Input() srch: SearchService;

  fCategories = new Array<FilterCategory>();

  public dataInitialized = false;
  public filteredProps: PropsFilterStruct[];
  public filteredManufacturers: MnfFilterStruct[];

  lastFilteredCat: FilterCategory;

  propFilterCondition = new Array<PropFilterCondition>();
  mnfFilterCondition = [];

  constructor(public popoverCtrl: PopoverController, public repo: AbstractDataRepository) {
    super();
  }

  public get inFilter(): boolean {
    return ((this.propFilterCondition.length > 0) || (this.mnfFilterCondition.length > 0));
  }

  async resetFilter() {
    this.propFilterCondition = [];
    this.mnfFilterCondition = [];
    this.srch.prodSrchParams.productProps = [];
    this.srch.prodSrchParams.supplier = [];
    await this.srch.search();
    this.initData();
  }

  initData() {
    this.fCategories = [];
    this.initFilterProps();
    this.initFilterManufacturers();
    this.initFilter();
    this.fCategories.sort((a, b) => {return (a.sortOrder - b.sortOrder)});
  }

  initFilter() {
    //this.propFilterCondition = [];
    //////// Props ///////
    let fItems = null;
    let fCat = null;

    let filteredPropCatId = null;
    if ((this.lastFilteredCat) && (this.lastFilteredCat.type === 'prop')) {
      filteredPropCatId = this.lastFilteredCat.id;
    };

    this.filteredProps.forEach(p => {
      if (!(p.prop.name == p.prevPropName) || !(p.prevPropName)) {
        fCat = new FilterCategory(p.prop.id, 'prop', p.prop.name, null,
                    ((filteredPropCatId) && (filteredPropCatId === p.prop.id)));
        fItems = new Array<FilterItem>();
        if (filteredPropCatId)
          this.lastFilteredCat = null;
      }


      fItems.push(new FilterItem(p.prop.id, p.value, p.isChecked, p.count, 'prop', p));

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
    fCat = new FilterCategory(0, 'sort', 'Sort', fItems, false, 3);
    this.fCategories.push(fCat);
  }

  initFilterManufacturers() {
    this.filteredManufacturers = [];
    //this.mnfFilterCondition = [];
    this.srch.aggs.mnfAgg.buckets.forEach(
      x => {
        const mnfId = x.key.substring(0, x.key.indexOf('|'));
        const mnfName = x.key.substring(x.key.indexOf('|')+1, x.key.length);

        const mnf = new Manufacturer(mnfId, mnfName);
        let mnfFlt = new MnfFilterStruct(mnf, x.doc_count, false);
        this.filteredManufacturers.push(mnfFlt);
      }
    );

    const justFiltered: boolean = ((this.lastFilteredCat) && (this.lastFilteredCat.type === 'mnf'));

    ////////////Заполняем модель формьі фильтра брендами////////////////
    let mnfAr = [];
    for (let m of this.filteredManufacturers) {
      let isChecked = !(this.mnfFilterCondition.indexOf(m.mnf.id) == -1);
      mnfAr.push(new FilterItem(m.mnf.id, m.mnf.name, isChecked, m.count, 'mnf', m));
    }
    this.fCategories.push(new FilterCategory(0, 'mnf', 'Brand', mnfAr, justFiltered, 5));
    ////////////////////////////////////////////////////////////////////
    if (justFiltered)
      this.lastFilteredCat = null;
  }

  initFilterProps() {
    this.filteredProps = [];
    this.srch.aggs.propsAgg.idProp.buckets.forEach(
      x => {
        const start_pos = x.key.indexOf('|');
        const end_pos = x.key.indexOf('|', start_pos+1);

        const propId = parseInt(x.key.substring(0, start_pos));
        const propName = x.key.substring(start_pos+1, end_pos);
        const prop = new Prop (propId, propName, -1);
        x.propVal.buckets.forEach(
          y => {

            const isChecked = (this.propFilterCondition
              .findIndex(x => {
                  return ((x.propId === propId) && (x.propVal === y.key));
                }
              ) !== -1);
            const pt = new PropsFilterStruct(prop, y.key, y.doc_count, isChecked, null);
            this.filteredProps.push(pt);
          }
        );
      }
    );

    // Заполняем значение название предыдущей группы для создания закладок с названиями групп
    let prevName = null;
    for (let i = 0; i < this.filteredProps.length; i++) {
      this.filteredProps[i].prevPropName = prevName;
      prevName = this.filteredProps[i].prop.name;
    };
    /*
    if ((this.lastFilteredItem) && (this.lastFilteredItem.type === 'prop'))
      this.lastFilteredItem = null;
    */
  }

  async onPropsClick(filterItem, filterCat: FilterCategory) {
    const data = filterItem.item;
    let cond = new PropFilterCondition(data.prop.id, data.value);
    let i = this.propFilterCondition
          .findIndex(z => ((z.propId === data.prop.id) && (z.propVal == data.value)));
    if ((data.isChecked))
      this.propFilterCondition.splice(i, 1);
    if ((i == -1) && (!data.isChecked))
      this.propFilterCondition.push(cond);
    this.srch.prodSrchParams.productProps = this.propFilterCondition;
    await this.srch.search();
    this.lastFilteredCat = filterCat;
    this.initData();
  }

  async onMnfClick(filterItem: FilterItem, filterCat: FilterCategory) {
    const mnf = filterItem.item;
    let i = this.mnfFilterCondition.indexOf(mnf.mnf.id);
    if ((i !== -1))
      this.mnfFilterCondition.splice(i, 1);
    if ((i == -1) && (!mnf.isChecked))
      this.mnfFilterCondition.push(mnf.mnf.id);
    this.srch.prodSrchParams.supplier = this.mnfFilterCondition;
    await this.srch.search();
    this.lastFilteredCat = filterCat;
    this.initData();
  }

  showFilter(event: any) {
    if (!this.dataInitialized) {
      this.dataInitialized = true;
      this.initData();
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
    this.srch.search();
  };

  sortByPriceDesc() {
    this.srch.prodSrchParams.sortOrder = SortOrderEnum.PriceHighToLow;
    this.srch.search();
  };

  sortByRating() {
    this.srch.prodSrchParams.sortOrder = SortOrderEnum.Rating;
    this.srch.search();
  };

  sortByRelevance() {
    this.srch.prodSrchParams.sortOrder = SortOrderEnum.Relevance;
    this.srch.search();
  };

}
