import {System} from '../../app/core/app-core';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import 'rxjs/add/operator/takeWhile';
import {ItemBase} from '../../components/component-extension/item-base';
import {StorePlace} from '../../app/model/store-place';
import {EventService} from '../../app/service/event-service';
import {NoveltyDetails} from '../../app/model/novelty-det';
import {Novelty} from '../../app/model/novelty';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {CartService} from '../../app/service/cart-service';

@IonicPage()
@Component({
  selector: 'page-novelty',
  templateUrl: 'novelty.html',
})
export class NoveltyPage extends ItemBase implements OnInit,OnDestroy {
  public noveltyId: number;
  public content: string = '';
  public novelty: Novelty;
  public noveltyDetails: NoveltyDetails[];
  public productId: number;
  available: boolean = true;

  qty = new System.FoxNumber();
  selectedStorePlace: StorePlace;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cart: CartService,
              public _repo:AbstractDataRepository, public toastCtrl: ToastController, public evServ: EventService) {
    super(navCtrl, navParams, _repo);
    if (this.navParams.data.id) this.noveltyId = this.navParams.data.id;
    if (this.navParams.data.productId) this.productId = this.navParams.data.productId;
    if (this.navParams.data.novelty) this.novelty = this.navParams.data.novelty;
    if (this.navParams.data.product) this.product = this.navParams.data.product;
    this.preloadQuotes = true;
    this.qty.value = 1;
  }

  async ngOnInit() {
    super.ngOnInit();
    if(!this.novelty) {
      this.novelty = await this._repo.getNovelty(this.noveltyId);
    }
    if(!this.product) {
      if (this.novelty && this.novelty.idProduct) {
        this.product = await this._repo.getProductById(this.novelty.idProduct);
      } else {
        this.product = await this._repo.getProductById(this.productId);
      }
    }
    if (this.novelty && this.novelty.novelty_content) {
      this.content = this.novelty.novelty_content;
    }
    if (this.novelty && this.novelty.id) {
      this.noveltyDetails = await this.repo.getNoveltyDetailsByNoveltyId(this.novelty.id);
    }
  }

  ngOnDestroy():void {
    super.ngOnDestroy();
  }

  public get id ():number {
    return this.novelty.id;
  }

  public get name ():string {
    return this.novelty.name;
  }

  public get img_url ():string {
    return this.novelty.img_url;
  }

  public get priority ():number {
    return this.novelty.priority;
  }

  public get sketch_content ():string {
    return this.novelty.sketch_content;
  }

  public get novelty_content ():string {
    return this.novelty.novelty_content;
  }

  public async addToCart() {
    if (this.noveltyDetails.length <= 1) {
      if (this.OnStock) {
        await this.cart.addItem( this.valueQuot,
                            this.qty.value,
                            this.Price,
                            this.selectedStorePlace,
                            this,
                true
                          );
      } else {
        this.showNotAddedToCartConfirmToast();
      }
    } /*else if (this.noveltyDetails.length > 1) {
      let productsIds: number[] = [];
      for (let noveltyD of this.noveltyDetails) {
        productsIds.push(noveltyD.idProduct);
      }
      this.navCtrl.push('CategoryPage', productsIds).catch(err => {
        console.log(`Couldn't navigate to CategoryPage: ${err}`);
      });
    }*/ else {
      this.showNotAddedToCartConfirmToast();
    }
  }

  showNotAddedToCartConfirmToast() {
    let message = this.locale['ToastMessage'];
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2500,
      position: 'bottom',
      cssClass: 'toast-message'
    });

    toast.onDidDismiss(() => {
    });

    toast.present().catch((err) => console.log(`Unable to show toast: ${err}`));
  }
}
