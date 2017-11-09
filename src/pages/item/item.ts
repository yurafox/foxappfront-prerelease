import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {ModalItemOptionPage} from "../index";

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
  // item info
  public item: any;

  constructor(public nav: NavController, public modalCtrl: ModalController) {
    // get the first item as sample data
    this.item = null;
  }

  // add or remove item on wish list
  toggleWishList(item) {
  }

  // get item options group name
  getOptionGroupsName(item) {
  }

  // make array with range is n
  range(n) {
    return new Array(n);
  }

  // open item option modal
  showOptions(item) {
    // show modal
    let modal = this.modalCtrl.create(ModalItemOptionPage, {item: item});

    // listen for modal close
    modal.onDidDismiss(confirm => {
      if (confirm) {
        // apply filter here
      } else {
        // do nothing
      }
    });

    modal.present();
  }
}
