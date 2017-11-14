import {Component, Input, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {ProductReview} from '../../app/model/product-review';

@IonicPage()
@Component({
  selector: 'page-item-review',
  templateUrl: 'item-review.html',
})

export class ItemReviewPage extends ComponentBase implements OnInit {

  @Input() rev: ProductReview;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
    this.rev = navParams.data;

  }

  ngOnInit() {

  }

}
