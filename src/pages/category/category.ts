import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, ModalController} from 'ionic-angular';
import {TabFilterPage, TabAttributePage} from "../index";

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  public tabFilterPage = TabFilterPage;
  public tabAttributePage = TabAttributePage;


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
              public actionSheetCtrl: ActionSheetController) {
    console.log(navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

}
