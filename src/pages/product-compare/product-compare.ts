import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {SearchService} from '../../app/service/search-service';
import {ProductCompareService} from '../../app/service/product-compare-service';
import {fadeInAnimation500} from '../../app/core/animation-core';

@IonicPage()
@Component({
  selector: 'page-product-compare',
  templateUrl: 'product-compare.html',
  animations:[fadeInAnimation500]
})
export class ProductComparePage extends ComponentBase implements OnInit {
  productId: number;
  defaultCategoryId: number;

 products: Array<number>;
  rerender: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public srchService: SearchService, public changeDet: ChangeDetectorRef, 
    public prodCompService: ProductCompareService ) {
    super();
    this.productId = this.navParams.data.productId;
    this.defaultCategoryId = this.navParams.data.categorytId;
  }

  async ngOnInit() {
    super.ngOnInit();
    this.products = this.prodCompService.getCompareProducts();
  }
  
  doRerender() {
    this.rerender = true;
    this.changeDet.detectChanges();
    this.rerender = false;
  }

  closeProductClick(dataEmit: any): void {
    this.prodCompService.removeCompareProducts(dataEmit.productId);
    this.products = this.prodCompService.getCompareProducts();
    this.productId = null;
    this.defaultCategoryId = dataEmit.defaultCategoryId;
    
    this.doRerender();
  }

  toHomePage() {
    this.navCtrl.setRoot('HomePage').catch(console.error);
  }

}
