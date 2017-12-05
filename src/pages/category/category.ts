import {IonicPage, NavController, NavParams, ActionSheetController, ModalController} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {ComponentBase} from '../../components/component-extension/component-base';
import {Product} from '../../app/model/product';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {QuotationProduct} from "../../app/model/quotation-product";
import {Manufacturer} from "../../app/model/manufacturer";

@IonicPage({name: 'CategoryPage', segment: 'category/:categoryId'})
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})

export class CategoryPage extends ComponentBase implements OnInit {

  public baseProducts: Product[];

  public slides = [
    {
      src: 'assets/imgs/category/mobtel/2120.jpg'
    },
    {
      src: 'assets/imgs/category/mobtel/2130.jpg'
    },
    {
      src: 'assets/imgs/category/mobtel/2177.jpg'
    },
    {
      src: 'assets/imgs/category/mobtel/2178.jpg'
    },
    {
      src: 'assets/imgs/category/mobtel/2223.jpg'
    },
    {
      src: 'assets/imgs/category/mobtel/2230.jpg'
    }

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
                private repo: AbstractDataRepository) {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();

    this.baseProducts = await this.repo.getProducts(this.navParams.data, true);

  }


}
