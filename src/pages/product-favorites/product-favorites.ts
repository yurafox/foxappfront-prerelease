import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {ProductFavoriteService} from '../../app/service/product-favorite-service';
import {Product} from './../../app/model/index';
import {fadeInAnimation500} from '../../app/core/animation-core';

@IonicPage()
@Component({
  selector: 'page-product-favorites',
  templateUrl: 'product-favorites.html',
  animations:[fadeInAnimation500]
})
export class ProductFavoritesPage extends ComponentBase implements OnInit {
  products: Array<Product>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public prodFavoriteService: ProductFavoriteService) {
      super();
  }

  async ngOnInit() {
    super.ngOnInit();
    this.refreshProducs().catch(console.error);
  }
  
  private async refreshProducs(){
    this.products = await this.prodFavoriteService.getProducts();
  }

  closeButtonClick(data: Product): void {
    this.prodFavoriteService.removeFavoriteProduct(data.id);
    this.refreshProducs().catch(console.error);
  }

  toHomePage() {
    this.navCtrl.setRoot('HomePage').catch(console.error);
  }

}
