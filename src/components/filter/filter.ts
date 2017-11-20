import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../app/model/product';
import {ComponentBase} from '../component-extension/component-base';
import {PopoverController} from 'ionic-angular';
import {FilterPopoverPage} from '../../pages/filter-popover/filter-popover';
import {Prop, Manufacturer} from '../../app/model/index';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

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

@Component({
  selector: 'filter',
  templateUrl: 'filter.html'
})
export class FilterComponent extends  ComponentBase implements OnInit {

  @Input() filteredProducts: Product[];

  @Input() parentComponent: any;

  baseProducts = new Array<Product>();
  //initialProducts = new Array<Product>();
  public dataInitialized = false;

  filteredProps: PropsFilterStruct[];
  public filteredManufacturers: MnfFilterStruct[];

  propFilterCondition = [];
  mnfFilterCondition = [];

  initData() {
    this.filteredProducts = [];
    this.filteredProps = [];
    this.filteredManufacturers = [];
    this.initFilterManufacturers();
    this.initFilterProps(this.baseProducts);
    this.filterRun();
  }

  resetFilter(): void {
    this.initData();
    this.parentComponent.products = [];
    this.baseProducts.forEach(i => {
      this.parentComponent.products.push(i);
    });
  }

  constructor(public popoverCtrl: PopoverController, public repo: AbstractDataRepository) {
    super();

  }

  async ngOnInit() {
    super.ngOnInit();
  }

  async initFilterManufacturers() {
    for (let p of this.baseProducts) {
      const i = this.filteredManufacturers.findIndex(z => (z.mnf.id == p.manufacturerId));
      if (i !== -1)
        this.filteredManufacturers[i].count++
      else {
        let mnf = new MnfFilterStruct(await this.repo.getManufacturerById(p.manufacturerId), 1, false);
        this.filteredManufacturers.push(mnf);
      }
      ;
    };
    this.filteredManufacturers.sort((a, b) => (a.mnf.name.localeCompare(b.mnf.name)));

  }

  initFilterProps(prodArray: Product[]) {
    this.filteredProps.length = 0;
    prodArray.forEach(p => {
      p.Props.forEach(a => {
        if (a.id_Prop.predestination) {
          const i = this.filteredProps.findIndex(z => ((z.prop.id === a.id_Prop.id)
                                                                    && (z.value == a.value)));
          if (i !== -1)
            this.filteredProps[i].count++
          else {
            const pt = new PropsFilterStruct(a.id_Prop, a.value, 1, false, null, (a.id_Prop.prop_type == 4) ? a.prop_Value_Enum.list_Index : null);
            this.filteredProps.push(pt);
          }
          ;
        }
      });
    });

    this.filteredProps.sort((x, y) => {
      if (x.prop.name.localeCompare(y.prop.name) == 0) {
        if (x.prop.prop_type == 4)
          return (x.listIndex - y.listIndex)
        else
          return x.value.toString().localeCompare(y.value.toString());
      } else
        return x.prop.name.localeCompare(y.prop.name);
    });
    // Заполняем значение название предыдущей группы для создания закладок с названиями групп
    let prevName = null;
    for (var i = 0; i < this.filteredProps.length; i++) {
      this.filteredProps[i].prevPropName = prevName;
      prevName = this.filteredProps[i].prop.name;
    }
    ;
  }

  filterRun() {
    this.filteredProducts.length = 0;
    this.baseProducts.forEach(p => {
        if (
          (this.filterByPrice(p, null, null/*this.startPriceFilterCondition, this.endPriceFilterCondition*/))
          &&
          (this.filterByManufacturer(p, this.mnfFilterCondition))
          &&
          (this.filterByPropertyValue(p, this.propFilterCondition))
        )
          this.filteredProducts.push(p);
      }
    );
    this.parentComponent.products = this.filteredProducts;
    //<any>(this.parentComponent).baseProducts = this.filteredProducts;
  }

  onPropsClick(data) {
    let cond = [data.prop.id, data.value];
    let i = this.propFilterCondition.findIndex(z => ((z[0] === data.prop.id) && (z[1] == data.value)));
    if ((data.isChecked))
      this.propFilterCondition.splice(i, 1);
    if ((i == -1) && (!data.isChecked))
      this.propFilterCondition.push(cond);
    this.filterRun();
  }

  onMnfClick(mnf) {
    let i = this.mnfFilterCondition.indexOf(mnf.mnf.id);
    if ((i !== -1))
      this.mnfFilterCondition.splice(i, 1);
    if ((i == -1) && (!mnf.isChecked))
      this.mnfFilterCondition.push(mnf.mnf.id);
    this.propFilterCondition.length = 0;
    this.initFilterProps(this.baseProducts);
    this.filterRun();
  }


  filterByPrice(product: Product, startPrice: number, endPrice: number): boolean {
    //return ((product.price >= startPrice) && (product.price <= endPrice));
    return true;
  }


  filterByManufacturer(product: Product, mnfArray: number[]): boolean {
    return ((mnfArray.length == 0) || (mnfArray.includes(product.manufacturerId))); //includes - Ecmascript7 feature
  }

  filterByPropertyValue(product: Product, propsArray: any[]): boolean {
    if (propsArray.length == 0) return true;
    for (let i in product.Props) {
      for (let j in propsArray) {
        let obj = propsArray[j];
        if ((obj[0] === product.Props[i].id_Prop.id) && (obj[1] == product.Props[i].value))
          return true;
      }
    }
    return false;
  }

  showFilter(event: any) {
    if (!this.dataInitialized) {
      this.filteredProducts.forEach(item => {
        this.baseProducts.push(item);
      });
      this.dataInitialized = true;
      this.initData();
    };

    let popover = this.popoverCtrl.create(FilterPopoverPage, {filterControl: this});
//    (<any>popover).filter = this;
    popover.present({
      ev: event
    });
  }

}
