import {Component, DoCheck} from '@angular/core';
import {NavController, IonicPage, AlertController, LoadingController} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
import {SelectShipAddressPage} from '../select-ship-address/select-ship-address';
import {UserService} from '../../app/service/bll/user-service';
import {LoginPage} from '../login/login';
import {fadeInAnimation500} from '../../app/core/animation-core';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  animations:[fadeInAnimation500]
})

export class CartPage extends ComponentBase implements DoCheck {

  constructor(public cart: CartService, private navCtrl: NavController,
              private uService: UserService, private alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
    super();
  }

  ngDoCheck() {

  }

  onDeleteItem(itemIndex: number) {
    this.cart.removeItem(itemIndex);
    this.ngDoCheck();
  }

  async onShowWarningsClick() {
    this.navCtrl.push('WarningViewPage');
  }

  get containsWarnings(): boolean {
    let res = false;
    for (let i of this.cart.orderProducts) {
      res = (!(i.warningRead) && !(i.warningMessage == null));
      if (res)
        break;
    }
    return res;
  }

  validateStep(): boolean {
    // Proceed to checkout rule
    let err = this.cart.cartErrors;
    if (err) {
      let alert = this.alertCtrl.create({
        message: this.locale['CartAlertMessage'],
        buttons: [
          {
            text: 'OK',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
      return false;
    }
    else
      return true;
  }

  async checkout() {
    if (!this.validateStep())
      return;

    if (!this.uService.isAuth) {
      this.navCtrl.push('LoginPage', {continuePage: 'SelectShipAddressPage'});
    }
    else {
      if (this.cart.checkIsPickupOnly) {
        this.cart.loShipments = await this.cart.repo.generateShipments();
        this.navCtrl.push('ShippingOptionsPage');
      }
      else
        this.navCtrl.push('SelectShipAddressPage', {fromCart: 1});
    };
  }

  async onAfterQtyUpdate(item: any, objRef: any) {
    let content = this.locale['LoadingContent'];
    let loading = this.loadingCtrl.create({
      content: content
    });
    loading.present();
    await this.cart.updateItem(objRef);
    this.evServ.events['cartUpdateEvent'].emit();
    loading.dismiss();
    this.ngDoCheck();
  }


  isFirstComplectItem(i: number): boolean {
    const op = this.cart.displayOrderProducts[i];
    return (op.orderProduct.complect) && !(op.prevComplect === op.orderProduct.complect);
  }

  isLastComplectItem(i: number): boolean {
    const op = this.cart.displayOrderProducts[i];
    return (op.orderProduct.complect)
      && (op.prevComplect === op.orderProduct.complect);
  }

  isComplectDivisorItem(i: number): boolean {
    if (i === 0) return false;
    if (i === this.cart.displayOrderProducts.length-1) return false;

    const thisOp = this.isFirstComplectItem(i);
    const prevOp = this.isLastComplectItem(i-1);

    return (thisOp) && (prevOp);
  }

  toHomePage() {
    this.navCtrl.setRoot('HomePage').catch(err => console.error(err));
  }

}
