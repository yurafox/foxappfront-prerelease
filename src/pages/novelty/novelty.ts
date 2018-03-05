import {System} from '../../app/core/app-core';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AbstractDataRepository, CartService} from '../../app/service/index';
import {Novelty} from './../../app/model/index';
import 'rxjs/add/operator/takeWhile';
import {ItemBase} from "../../components/component-extension/item-base";
import {StorePlace} from "../../app/model/store-place";
import {EventService} from '../../app/service/event-service';
import {NoveltyDetails} from "../../app/model/novelty-det";

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
  private available: boolean = true;

  qty = new System.FoxNumber();
  selectedStorePlace: StorePlace;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cart: CartService,
              private _repo:AbstractDataRepository, public toastCtrl: ToastController, public evServ: EventService) {
    super(navCtrl, navParams, _repo);
    this.noveltyId = this.navParams.data.id;
    this.productId = this.navParams.data.productId;
    this.novelty = this.navParams.data.novelty;
    this.product = this.navParams.data.product;
    this.preloadQuotes = true;
    this.qty.value = 1;
  }

  async ngOnInit() {
    super.ngOnInit();
    if(!this.novelty) {
      this.novelty = await this._repo.getNovelty(this.noveltyId);
    }
    if(!this.product) {
      this.product = await this._repo.getProductById(this.productId);
    }
    // get dynamic content
    this.content = this.novelty.novelty_content;

    this.noveltyDetails = await this.repo.getNoveltyDetailsByNoveltyId(this.novelty.id);
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

  public addToCart(): void {
    if (this.noveltyDetails.length <= 1) {
      if (this.OnStock) {
        this.cart.addItem( this.valueQuot,
                            this.qty.value,
                            this.Price,
                            this.selectedStorePlace,
                            this
                          );
      } else {
        this.showNotAddedToCartConfirmToast();
      }
    } else if (this.noveltyDetails.length > 1) {
      let productsIds: number[] = [];
      for (let noveltyD of this.noveltyDetails) {
        productsIds.push(noveltyD.idProduct);
      }
      this.navCtrl.push('CategoryPage', productsIds).catch(err => {
        console.log(`Couldn't navigate to CategoryPage: ${err}`);
      });
    } else {
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
