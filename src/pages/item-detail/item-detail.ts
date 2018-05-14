import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {ProductReview} from '../../app/model/product-review';
import {ItemBase} from '../../components/component-extension/item-base';
import {CartService} from '../../app/service/cart-service';
import {CustomPopupComponent} from '../../components/custom-popup/custom-popup';
import {StorePlace} from '../../app/model/store-place';
import {EmailValidator, System} from '../../app/core/app-core';
import {CreditCalcPage} from '../credit-calc/credit-calc';
import {EventService} from '../../app/service/event-service';
import {ActionByProduct} from '../../app/model/action-by-product';
import {UserService} from '../../app/service/bll/user-service';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage extends ItemBase implements OnInit {

  qty = new System.FoxNumber();
  selectedStorePlace: StorePlace;
  reviews = new Array<ProductReview>();
  description: string;
  minLoanAmt = 0;
  maxLoanAmt = 0;
  actionsArr = new Array<ActionByProduct>();
  complectsArr = new Array<ActionByProduct>();
  clientId: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public repo: AbstractDataRepository, public cart: CartService,
              public modalCtrl: ModalController, public toastCtrl: ToastController,
              public evServ: EventService, public alertCtrl: AlertController, public uService: UserService) {
    super(navCtrl, navParams, repo);
    this.product = this.navParams.data.prod;
    this.preloadQuotes = this.navParams.data.loadQuotes;
    this.qty.value = 1;
    repo.getProductImages(this.product.id).then(
        x =>
          this.product.slideImageUrls = x
    );
  }

  async ngOnInit() {
    super.ngOnInit();
    this.repo.getProductReviewsByProductId(this.product.id).then( x => {
        if (x && x.reviews && x.idClient) {
          this.reviews = x.reviews;
          this.clientId = x.idClient;
        }
      }
    );


    this.repo.getProductDescription(this.product.id).then( x => {
        this.description = x;
      }
    );

    if (this.userService.isAuth)
      this.repo.postProductView(this.product.id, null);

    this.actionsArr = await this.repo.getActionsByProduct(this.product.id);
    this.complectsArr = this.actionsArr.filter(x => ((x.complect) && ((x.actionType === 4) || (x.actionType === 5))));

    this.minLoanAmt = parseInt(await this.repo.getAppParam('MIN_LOAN_AMT'));
    this.maxLoanAmt = parseInt(await this.repo.getAppParam('MAX_LOAN_AMT'));
  }

  onShowProductDescription(): void {
    this.navCtrl.push('ItemDescriptionPage', this.description);
  }

  onShowProductProps(): void {
    this.navCtrl.push('ItemPropsPage', this.product);
  }

  onShowReviewClick(data: any): void {
    this.navCtrl.push('ItemReviewPage', data);
  }

  onShowReviewsClick(data: any): void {
    this.navCtrl.push('ItemReviewsPage', data);
  }

  onWriteReview(data: any): void {
    if (!this.userService.isAuth) {
      this.navCtrl.push('LoginPage', {continuePage: 'ItemReviewWritePage', params: this.product}).catch((err) => {
        console.log(`Couldn't navigate to LoginPage: ${err}`);
      });
    } else {
      this.navCtrl.push('ItemReviewWritePage', this.product).catch(err => {
        console.log(`Error navigating to ItemReviewWritePage: ${err}`);
      });
    }
  }

  onShowMoreQuotesClick(): void {
    this.navCtrl.push('ItemQuotesPage', {prod: this.product, quotesArr: this.quotes});
  }

  async onAddToCart() {
    await this.cart.addItem(this.valueQuot, this.qty.value, this.product.price, this.selectedStorePlace, this);
  }

  onGetForLoan() {
    let calcModal = this.modalCtrl.create(CreditCalcPage,
      {quotProduct: this.valueQuot,
            storePlace: this.selectedStorePlace,
            qty: this.qty.value,
            price: this.product.price,
            itemPage: this});
    calcModal.onDidDismiss(data => {
      if (data)
        this.navCtrl.push(data.nextPage, data.params);
    });
    calcModal.present();
  }

  showLocationPopover() {
    let modal = this.modalCtrl.create(CustomPopupComponent, {itemPage: this}, {showBackdrop:true, enableBackdropDismiss:true});
    modal.present({});
  }

  hasClientReview(): boolean {
    let present = false;
    let clientId = this.clientId;
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].idClient === clientId) present = true;
    }
    return present;
  }

  notifyOnArrivalResult(email: string): boolean {
    if (EmailValidator.isValid(email)) {
      this.repo.notifyOnProductArrival(email, this.product.id).then(() => {
          this.showToast(this.locale['InformUponArrivalConfirmation']);
          return true;
        }
      );
    }
    else {
      this.showToast(this.locale['IvalidEmail']);
      return false;
    }
  }

  async onArrivalNotify() {

    if ((this.uService.isAuth) && (this.uService.profile.email) && (EmailValidator.isValid(this.uService.profile.email))) {
      this.notifyOnArrivalResult(this.uService.profile.email)
    }
    else
    {
      let alert = this.alertCtrl.create({
        title: this.locale['InformUponArrival'],
        inputs: [
          {
            name: 'email',
            type: 'email',
            placeholder: this.locale['EmailPlaceholderText']
          }
        ],
        buttons: [
          {
            text: 'OK',
            handler: data => {
              return this.notifyOnArrivalResult(data.email);
            }
          },
          {
            text: this.locale['CancelBtnCaption'],
            role: 'cancel',
            handler: data => {
            }
          }
        ]
      });
      alert.present();
    }
  }

  showToast(data: any) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

}
