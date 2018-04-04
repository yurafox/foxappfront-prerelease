import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {ComponentBase} from '../../components/component-extension/component-base';
import {Product} from '../../app/model/product';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

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
    if (typeof this.navParams.data === "string") {
      this.baseProducts = await this.repo.getProducts(this.navParams.data, true);
    } else if (typeof this.navParams.data === "object") {
      if(this.navParams.data && (this.navParams.data.length > 0)){
        let products: Product[] = [];
        for (let productId of this.navParams.data) {
          let p = await this.repo.getProductById(productId);
          products.push(p);
        }
        this.baseProducts = products;
      }
    }
  }

}
