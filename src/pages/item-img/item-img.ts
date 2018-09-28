import {Component, DoCheck, ViewChild} from '@angular/core';
import {IonicPage, NavParams, Slides, ViewController} from 'ionic-angular';
import {Product} from '../../app/model/product';


@IonicPage()
@Component({
  selector: 'page-item-img',
  templateUrl: 'item-img.html',
})
export class ItemImgPage implements DoCheck {

  @ViewChild(Slides) slides: Slides;
  product: Product;
  imgIdx: number = 0;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.product = this.navParams.data.product;
    this.imgIdx = this.navParams.data.imgIdx;
  }

  close() {
    this.viewCtrl.dismiss().catch(console.error);
  }

  ngDoCheck() {
    if  ((this.slides) && (this.slides._zoom))
      this.slides.lockSwipes(this.slides._zoom.currentScale != 1);
  }

}
