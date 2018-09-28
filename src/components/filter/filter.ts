import {Component, DoCheck, Input, ViewChild} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {LoadingController, PopoverController, Popover} from 'ionic-angular';
import {FilterPopoverPage} from '../../pages/filter-popover/filter-popover';
import {SearchService, SortOrderEnum} from '../../app/service/search-service';
import {Category} from '../../app/model/category';
import {Manufacturer} from '../../app/model/manufacturer';
import {Prop} from '../../app/model/prop';


class GeneralFilterStruct {
  constructor(
    public obj: any,
    public count: number,
    public isChecked: boolean
  ){}
}

class PropsFilterStruct {
  constructor(
    public prop: Prop,
    public value: any,
    public count: number,
    public isChecked: boolean,
    public prevPropName?: string,
    public listIndex?: number,
    public isOpened:boolean = false
  ){}
}

export class PropFilterCondition {
  constructor(
    public propId: number,
    public propVal: string
  ){}
}

export enum CategoryType {
  Sort = 1,
  Manufacturer = 2,
  Property = 3,
  ProductGroup = 4
}

class FilterItem {
  constructor(
    public id: number,
    public name: string,
    public isChecked?: boolean,
    public count?: number,
    public type?: CategoryType,
    public item?: any
  ){}
}

class FilterCategory {
  constructor (
    public tag: number,
    public type: CategoryType,
    public catName: string,
    public items?: FilterItem[],
    public isOpened: boolean = false,
    public sortOrder?: number,
  ){}

  public get filterExpr(): string {
    return this.items
          .filter(x => x.isChecked)
          .map(y => y.name)
          .join(', ');
  }
}

@Component({
  selector: 'filter',
  templateUrl: 'filter.html'
})
export class FilterComponent extends ComponentBase implements DoCheck {
  @ViewChild('filterControl') filterControl;
  @Input() srch: SearchService;
  lastFilteredCat: FilterCategory;
  propFilterCondition = [];
  mnfFilterCondition = [];
  groupsFilterCondition = [];
  dataInitialized = false;
  clientHeight = 0;
  fCategories = [];
  filteredProps: PropsFilterStruct[];
  filteredManufacturers: GeneralFilterStruct[];
  filteredGroups: GeneralFilterStruct[];
  currentPopover:Popover;

  constructor(public popoverCtrl: PopoverController,
              public loadingCtrl: LoadingController) {
    super();
  }

  ngDoCheck() {
    this.clientHeight = this.filterControl.nativeElement.clientHeight;
  }

  public get inFilter(): boolean {
    return (
              (this.propFilterCondition.length > 0)
              || (this.mnfFilterCondition.length > 0)
              || (this.groupsFilterCondition.length > 0)
            );
  }

  async resetFilter() {
    let content = this.locale['LoadingContent'];
    let loading = this.loadingCtrl.create({
      content: content
    });
    try {
      await loading.present();
      this.propFilterCondition = [];
      this.mnfFilterCondition = [];
      this.groupsFilterCondition = [];
      this.srch.prodSrchParams.productProps = [];
      this.srch.prodSrchParams.supplier = [];
      this.srch.prodSrchParams.category = [];
      await this.srch.search();
      this.initData();

      if(this.currentPopover)
        this.currentPopover.dismiss().catch(console.error);
      
    }
    finally {
      if(loading) {await loading.dismiss();}
    }
  }

  initData() {
    this.fCategories = [];
    this.initFilterProps();
    this.initFilterManufacturers();
    this.initFilterGroups();
    this.initFilter();
    this.fCategories.sort((a, b) => {return (a.sortOrder - b.sortOrder)});
  }

  initFilter() {
    //////// Props ///////
    let filteredPropCatId = null;
    if ((this.lastFilteredCat) && (this.lastFilteredCat.type === CategoryType.Property)) {
      filteredPropCatId = this.lastFilteredCat.tag;
    }


    let fPropItems = [];
    this.filteredProps.forEach(p => {
      let fPropsCat = null;
      if (!(p.prop.name == p.prevPropName) || !(p.prevPropName)) {
        fPropsCat = new FilterCategory(p.prop.id, CategoryType.Property, p.prop.name, null,
                    ((filteredPropCatId) && (filteredPropCatId === p.prop.id)));
        fPropItems = [];
        if (filteredPropCatId)
          this.lastFilteredCat = null;
      }

      fPropItems.push(new FilterItem(p.prop.id, p.value, p.isChecked, p.count, CategoryType.Property, p));

      if (!(p.prop.name == p.prevPropName)) {
        fPropsCat.items = fPropItems;
        fPropsCat.sortOrder = 10;
        this.fCategories.push(fPropsCat);
      }
    });

    ///////// Sort ////////
    let fSortItems = [];
    fSortItems.push(new FilterItem(-1, 'Relevance', true, 0, CategoryType.Sort, null));
    fSortItems.push(new FilterItem(0, 'Price: Low to High', false, 0, CategoryType.Sort, null));
    fSortItems.push(new FilterItem(1, 'Price: High to Low', false, 0, CategoryType.Sort, null));
    fSortItems.push(new FilterItem(2, 'Rating', false, 0, CategoryType.Sort, null));
    fSortItems.push(new FilterItem(3, 'Popularity', false, 0, CategoryType.Sort, null));
    let fSortCat = new FilterCategory(0, CategoryType.Sort, 'Sort', fSortItems, false, 3);
    this.fCategories.push(fSortCat);
  }

  initFilterGroups() {
    this.filteredGroups = [];
    if (this.srch.prodSrchParams.categoryId)
      return;
    this.srch.aggs.catsAgg.buckets.forEach(
      x => {
        const grId = x.key.substring(0, x.key.indexOf('|'));
        const grName = x.key.substring(x.key.indexOf('|')+1, x.key.length);

        const cat = new Category(grId, null, grName);
        let catFlt = new GeneralFilterStruct(cat, x.doc_count, false);
        if (grId != 0) // не выводим null-группы
          this.filteredGroups.push(catFlt);
      }
    );

    const justFiltered: boolean = ((this.lastFilteredCat) && (this.lastFilteredCat.type === CategoryType.ProductGroup));


    let grAr = [];
    for (let m of this.filteredGroups) {
      let isChecked = !(this.groupsFilterCondition.indexOf(m.obj.id) == -1);
      grAr.push(new FilterItem(m.obj.id, m.obj.name, isChecked, m.count, CategoryType.ProductGroup, m));
    }
    this.fCategories.push(new FilterCategory(0, CategoryType.ProductGroup, 'Category', grAr, justFiltered, 6));
    if (justFiltered)
      this.lastFilteredCat = null;
  }

  initFilterManufacturers() {
    this.filteredManufacturers = [];
    this.srch.aggs.mnfAgg.buckets.forEach(
      x => {
        const mnfId = x.key.substring(0, x.key.indexOf('|'));
        const mnfName = x.key.substring(x.key.indexOf('|')+1, x.key.length);

        const mnf = new Manufacturer(mnfId, mnfName);
        let mnfFlt = new GeneralFilterStruct(mnf, x.doc_count, false);
        if (mnfId != 0) //не выводим null-производителей
          this.filteredManufacturers.push(mnfFlt);
      }
    );

    const justFiltered: boolean = ((this.lastFilteredCat) && (this.lastFilteredCat.type === CategoryType.Manufacturer));

    ////////////Заполняем модель формьі фильтра брендами////////////////
    let mnfAr = [];
    for (let m of this.filteredManufacturers) {
      let isChecked = !(this.mnfFilterCondition.indexOf(m.obj.id) == -1);
      mnfAr.push(new FilterItem(m.obj.id, m.obj.name, isChecked, m.count, CategoryType.Manufacturer, m));
    }
    this.fCategories.push(new FilterCategory(0, CategoryType.Manufacturer, 'Brand', mnfAr, justFiltered, 5));
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
            const pt = new PropsFilterStruct(prop, y.key, y.doc_count, isChecked);
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
    }
  }

  onPropsClick(filterItem, filterCat: FilterCategory) {
    const data = filterItem.item;
    let cond = new PropFilterCondition(data.prop.id, data.value);
    let i = this.propFilterCondition
          .findIndex(z => ((z.propId === data.prop.id) && (z.propVal == data.value)));
    if ((data.isChecked))
      this.propFilterCondition.splice(i, 1);
    if ((i == -1) && (!data.isChecked))
      this.propFilterCondition.push(cond);
    this.srch.prodSrchParams.productProps = this.propFilterCondition;
    this.applyFilter(filterCat).catch(console.error);
  }

  onMnfClick(filterItem: FilterItem, filterCat: FilterCategory) {
    const mnf = filterItem.item;
    let i = this.mnfFilterCondition.indexOf(mnf.obj.id);
    if ((i !== -1))
      this.mnfFilterCondition.splice(i, 1);
    if ((i == -1) && (!mnf.isChecked))
      this.mnfFilterCondition.push(mnf.obj.id);
    this.srch.prodSrchParams.supplier = this.mnfFilterCondition;
    this.applyFilter(filterCat).catch(console.error);
  }

  onGroupsClick(filterItem: FilterItem, filterCat: FilterCategory) {
    const gr = filterItem.item;
    let i = this.groupsFilterCondition.indexOf(gr.obj.id);
    if ((i !== -1))
      this.groupsFilterCondition.splice(i, 1);
    if ((i == -1) && (!gr.isChecked))
      this.groupsFilterCondition.push(gr.obj.id);
    this.srch.prodSrchParams.category = this.groupsFilterCondition;
    this.applyFilter(filterCat).catch(console.error);
  }


  async applyFilter(lastFilterItem: FilterCategory) {
    await this.srch.search();
    this.lastFilteredCat = lastFilterItem;
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
    }).catch(console.error);
    
    // save reference on current popover for aot fix
    this.currentPopover= popover;
  }

  sort(order: SortOrderEnum) {
    this.srch.prodSrchParams.sortOrder = order;
    this.srch.search().catch(console.error);
  }

}
