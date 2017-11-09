import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import {ItemService} from '../../services/mock-services/item-service';
import {CategoryService} from '../../services/mock-services/category-service';
import {ModalFilterPage, ItemPage, TabFilterPage, TabAttributePage} from "../index";

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  public tabFilterPage = TabFilterPage;
  public tabAttributePage = TabAttributePage;

  // list items of this category
  public items: any;

  // category info
  public category: any;

  // view type
  public viewType = 'list';

  // sort by
  public sortBy = 'Best Match';

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: ItemService,
              public categoryService: CategoryService, public modalCtrl: ModalController,
              public actionSheetCtrl: ActionSheetController) {
    console.log(navParams.data);

    // get list items of a category as sample
    this.items = itemService.getByCategory(1);

    // set category info
    this.category = categoryService.getItem(1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  // switch to list view
  viewList() {
    this.viewType = 'list';
  }

  // swith to grid view
  viewGrid() {
    this.viewType = 'grid';
  }

  // get discount percent
  discountPercent(originPrice, salePrice) {
    return Math.round((salePrice - originPrice) * 100 / originPrice)
  }

  // choose sort by
  chooseSortBy() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Best Match',
          handler: () => {
            this.sortBy = 'Best Match';
          }
        },
        {
          text: 'Lowest Price First',
          handler: () => {
            this.sortBy = 'Lowest Price First';
          }
        },
        {
          text: 'Highest Price First',
          handler: () => {
            this.sortBy = 'Highest Price First';
          }
        },
        {
          text: 'No. of orders',
          handler: () => {
            this.sortBy = 'No. of orders';
          }
        },
        {
          text: 'Seller Rating',
          handler: () => {
            this.sortBy = 'Seller Rating';
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // show filter modal
  openFilter(tabName) {
    // show modal
    let modal = this.modalCtrl.create(ModalFilterPage, {tabName: tabName});

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

  // view a item
  viewItem(itemId) {
    this.navCtrl.push(ItemPage, {id: itemId})
  }

}
