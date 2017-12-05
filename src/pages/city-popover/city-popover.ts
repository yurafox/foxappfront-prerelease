import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {CustomPopupComponent} from '../../components/custom-popup/custom-popup';
import {City} from '../../app/model/city';
import {StorePlace} from '../../app/model/store-place';
import {ProductStorePlace} from '../../app/model/product-store-place';
import {ComponentBase} from "../../components/component-extension/component-base";

@IonicPage()
@Component({
  selector: 'page-city-popover',
  templateUrl: 'city-popover.html',
})
export class CityPopoverPage extends ComponentBase  {

  caller: CustomPopupComponent;
  cityList: City[] = new Array<City>();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController) {
    super();
    this.caller = navParams.get('caller');
    this.createCityList();
  }

  async createCityList () {
    for (let loc of this.caller.originalLocations) {
      let sp = await (<any>loc).storeplace_p;
      let ci = await (<any>sp).city_p;

      let itemInList = false;
      this.cityList.forEach(item => {
          if (item.id == ci.id)
            itemInList = true;
        }
      );
      if (!itemInList)
        this.cityList.push(ci);
    }
    this.cityList.sort((a,b) => {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    });
  }

  async filterByCity(item: City) {
    let sp = new Array<ProductStorePlace>();
    for (let place of this.caller.originalLocations) {
      let a = await (<any>place).storeplace_p;
      if (a.idCity == item.id)
        sp.push(place);
    }
    this.caller.displayLocations = sp;
    this.viewCtrl.dismiss();
  }

}
