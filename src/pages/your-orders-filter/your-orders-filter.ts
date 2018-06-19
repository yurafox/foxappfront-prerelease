import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {OrdersFilter} from '../your-orders/your-orders';
import {ComponentBase} from '../../components/component-extension/component-base';

@IonicPage()
@Component({
  selector: 'page-your-orders-filter',
  templateUrl: 'your-orders-filter.html',
})
export class OrdersFilterPage extends ComponentBase {
  dataLoaded = false;
  filterOptions: {filter: OrdersFilter, isChecked: boolean}[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public repo: AbstractDataRepository) {
    super();
    this.InitData();
  }

  async InitData() {
    const fltrs = await this.repo.getClientOrderDatesRanges();
    fltrs.forEach(x => {
      this.filterOptions.push({filter: x, isChecked: (this.navParams.data.filter.key === x.key)});
    });
    this.dataLoaded = true;
  }

  onSelectFilterOptionClick(fOption: any, event: any) {
    for (let i of this.filterOptions) {
      i.isChecked = (i.filter.key === fOption.filter.key);
    }
    event.preventDefault();
  }

  get selectedFilter(): OrdersFilter {
    return this.filterOptions.filter(x => x.isChecked === true)[0].filter;
  }

  async onApplyFilterClick() {
    await this.navCtrl.push('OrdersPage', {filter: this.selectedFilter});
    this.navCtrl.remove((this.navCtrl.getActive().index)-2, 2);
  }

}
