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
import {ItemImgPage} from '../item-img/item-img';
import {ProductCompareService, PropWithIndex} from '../../app/service/product-compare-service';
import {ProductFavoriteService} from '../../app/service/product-favorite-service';
import {SearchService} from '../../app/service/search-service';
import { Product, ProductPropValue } from '../../app/model';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage extends ItemBase implements OnInit {

  qty = new System.FoxNumber();
  selectedStorePlace: StorePlace;
  reviews = new Array<ProductReview>();
  reviewsObj: {reviews: ProductReview[], idClient: number};
  description: string;
  minLoanAmt = 0;
  maxLoanAmt = 0;
  actionsArr = new Array<ActionByProduct>();
  complectsArr = new Array<ActionByProduct>();
  clientId: number = 0;
  cantShow: boolean;
  productIsCompare: boolean;
  hideProductCompare: boolean;
  productIsFavorite: boolean;
  similarProducts: Array<Product> = [];
  popularAccessories: Array<Product> = [];
  displayPropCount: number;
  similarProducstsResolved = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public repo: AbstractDataRepository, public cart: CartService,
              public modalCtrl: ModalController, public toastCtrl: ToastController,
              public evServ: EventService, public alertCtrl: AlertController, public uService: UserService,
              public prodCompService: ProductCompareService, public prodFavoriteService: ProductFavoriteService,
              public srchService: SearchService,) {
    super(navCtrl, navParams, repo);
    this.displayPropCount = 7;
    this.cantShow = true;
    this.product = this.navParams.data.prod;
    this.preloadQuotes = this.navParams.data.loadQuotes;
    this.hideProductCompare = this.navParams.data.hideProductCompare;
    this.qty.value = 1;
    repo.getProductImages(this.product.id).then(
        x =>
          this.product.slideImageUrls = x
    );
  }

  async ngOnInit() {
    super.ngOnInit();

    await this.loadSimilarProducts();
    this.popularAccessories = await this.repo.getPopularAccessories(this.product.id);
    this.similarProducstsResolved = true;

    this.reviewsObj = await this.repo.getProductReviewsByProductId(this.product.id);
    if (this.reviewsObj) {
      this.reviews = this.reviewsObj.reviews;
      this.clientId = this.reviewsObj.idClient;
    }

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

    this.cantShow = this.hasClientReview();
  }

  async ionViewDidEnter() {
    if (this.product) {
      this.checkProductIsCompare();
      this.checkProductIsFavorite();

      let hasClientReviews = await this.repo.getHasClientProductReview(this.product.id);
      if (hasClientReviews && hasClientReviews != null && hasClientReviews.hasReview) {
        this.cantShow = hasClientReviews.hasReview;
      }
    }
  }

  onShowProductDescription(): void {
    this.navCtrl.push('ItemDescriptionPage', this.description);
  }

  onShowProductProps(): void {
    this.navCtrl.push('ItemPropsPage', this.product);
  }

  onShowReviewClick(review: any): void {
    this.navCtrl.push('ItemReviewPage', review);
  }

  onShowReviewsClick(): void {
    this.navCtrl.push('ItemReviewsPage', {page: this, product: this.product});
  }

  onWriteReview(): void {
    if (!this.userService.isAuth) {
      this.navCtrl.push('LoginPage', {continuePage: 'ItemReviewWritePage', params: {product: this.product, page: this, reviews: this.reviews}}).catch((err) => {
        console.log(`Couldn't navigate to LoginPage: ${err}`);
      });
    } else {
      this.navCtrl.push('ItemReviewWritePage', {product: this.product, page: this, reviews: this.reviews}).catch(err => {
        console.log(`Error navigating to ItemReviewWritePage: ${err}`);
      });
    }
  }

  onShowMoreQuotesClick(): void {
    this.navCtrl.push('ItemQuotesPage', {prod: this.product, quotesArr: this.quotes});
  }

  async onAddToCart() {
    await this.cart.addItem(this.valueQuot, this.qty.value, this.product.price, this.selectedStorePlace, this, true);
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

  onShowItemImg(imgIdx: number) {
    let itemImgModal = this.modalCtrl.create(ItemImgPage,
      {product: this.product, imgIdx: imgIdx});
    itemImgModal.present();
  }

  showLocationPopover() {
    let modal = this.modalCtrl.create(CustomPopupComponent, {itemPage: this}, {showBackdrop:true, enableBackdropDismiss:true});
    modal.present({});
  }

  hasClientReview(): boolean {
    let present = false;
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].idClient === this.clientId) present = true;
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

  checkProductIsCompare() {
    this.productIsCompare = (this.prodCompService.findCompareProducts(this.product.id) !== undefined);
  }

  onAddProductToCompare() {
    this.prodCompService.addCompareProducts(this.product.id);
    this.checkProductIsCompare();
    this.showToast(this.locale['ProductAddСompare']);
  }

  onOpenProductComparePage() {
    this.navCtrl.push('ProductComparePage', {productId: this.product.id});
  }

  checkProductIsFavorite() {
    this.productIsFavorite = (this.prodFavoriteService.findFavoriteProduct(this.product.id) !== undefined);
  }

  onAddProductToFavorites() {
    this.prodFavoriteService.addFavoriteProduct(this.product.id);
    this.checkProductIsFavorite();
  }

  onRemoveProductFromFavorites() {
    this.prodFavoriteService.removeFavoriteProduct(this.product.id);
    this.checkProductIsFavorite();
  }

  async loadSimilarProducts() {
    let loadProducts: Array<Product> = await this.repo.getSimilarProducts(this.product.id);
  
    let uniqueProps = new Array<PropWithIndex>();
    let uniqueSortedProps = new Array<PropWithIndex>();

    loadProducts.forEach(product => {
      product.props.forEach(i => {
          if (!uniqueProps.find((x) => {return x.property.id === i.id_Prop.id}))
            uniqueProps.push(new PropWithIndex(i.id_Prop, i.idx));
        }
      );
      }
    );

    uniqueSortedProps = uniqueProps.sort( (x,y) => {return x.idx - y.idx || x.property.id - y.property.id});

    loadProducts.forEach(product => { 
      let findedProp = false;
      for(var i = 0; i < this.displayPropCount - 2; i++) {
        if( i < uniqueSortedProps.length) {
          let propVal: ProductPropValue = product.props.find((x) => { return x.id_Prop.id === uniqueSortedProps[i].property.id });

          if(propVal)
            if(!(propVal.pVal == null || propVal.pVal == undefined)) {
              findedProp = true;
          }
        }
      }

      if(findedProp) 
        this.similarProducts.push(product);
    });
   }

}
