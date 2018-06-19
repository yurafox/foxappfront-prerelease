import {Component, DoCheck, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides, ViewController} from 'ionic-angular';
import {Product} from '../../app/model/product';


@IonicPage()
@Component({
  selector: 'page-item-img',
  templateUrl: 'item-img.html',
})
export class ItemImgPage implements DoCheck {

  @ViewChild(Slides) slides: Slides;
  public product: Product;
  public imgIdx: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.product = this.navParams.data.product;
    this.imgIdx = this.navParams.data.imgIdx;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  ngDoCheck() {
    if  ((this.slides) && (this.slides._zoom))
      this.slides.lockSwipes(this.slides._zoom.currentScale != 1);
  }

}
