import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, ToastController} from 'ionic-angular';

import {ItemService} from '../../services/mock-services/item-service';

@Component({
  selector: 'page-modal-item-option',
  templateUrl: 'modal-item-option.html'
})
export class ModalItemOptionPage {
  // current item
  public item: any;

  quantity: number = 1;

  constructor(public nav: NavController, public itemService: ItemService, public navParams: NavParams,
              public viewCtrl: ViewController, public toastCtrl: ToastController) {
    this.item = navParams.get('item');
    this.item.option_price = 0;
  }

  // choose a option
  chooseOption(optionGroup, option) {
    for (let i = 0; i < optionGroup.options.length; i++) {
      optionGroup.options[i].active = false;
    }

    option.active = true;
    optionGroup.currentOption = option;

    // recalculate price
    this.calculatePrice();
  }

  // calculate item price
  calculatePrice() {
    this.item.option_price = 0;
    for (let i = 0; i < this.item.option_groups.length; i++) {
      if (this.item.option_groups[i].currentOption)
        this.item.option_price += this.item.option_groups[i].currentOption.price;
    }
  }

  // add to card
  addCart(item) {
    let toast = this.toastCtrl.create({
      message: 'Item added to card',
      duration: 500,
      position: 'middle'
    });

    toast.present();
  }

  // buy now
  buy(item) {
    console.log("You decided to buy " + item);
  }

  quantityRemoveOne() {
    if (1 < this.quantity) {
      this.quantity = this.quantity - 1;
    } else {
      return;
    }
  }
  quantityAddOne() {
    this.quantity = this.quantity + 1;
  }
}
