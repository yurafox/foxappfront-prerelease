import {Component} from '@angular/core';
import {NavController, IonicPage, AlertController} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
import {UserService} from '../../app/service/bll/user-service';
import {fadeInAnimation500} from '../../app/core/animation-core';
import {AppConstants} from '../../app/app-constants';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  animations:[fadeInAnimation500]
})

export class CartPage extends ComponentBase {

  public mPlaceFeaturesEnabled = AppConstants.ENABLE_MARKETPLACE_FEATURES;

  constructor(public cart: CartService, public navCtrl: NavController,
              public uService: UserService, public alertCtrl: AlertController) {
    super();
  }

  public async onDeleteItem(itemIndex: number) {
    await this.cart.removeItem(itemIndex, true);
  }

  public async onShowWarningsClick() {
    this.navCtrl.push('WarningViewPage').catch(console.error);
  }

  public get containsWarnings(): boolean {
    let res = false;
    for (let i of this.cart.orderProducts) {
      res = (!(i.warningRead) && !(i.warningMessage == null));
      if (res)
        break;
    }
    return res;
  }

  public validateStep(): boolean {
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
      alert.present().catch(console.error);
      return false;
    }
    else
      return true;
  }

  public async checkout() {
    if (!this.validateStep())
      return;

    if (!this.uService.isAuth) {
      this.navCtrl.push('LoginPage', {continuePage: 'SelectShipAddressPage'}).catch(console.error);
    }
    else {
      if (this.cart.checkIsPickupOnly) {
        this.cart.loShipments = await this.cart.cartRepo.generateShipments();
        this.navCtrl.push('ShippingOptionsPage').catch(console.error);
      }
      else
        this.navCtrl.push('SelectShipAddressPage', {fromCart: 1}).catch(console.error);
    }
  }

  public async onAfterQtyUpdate(item: any, objRef: any) {
    await this.cart.updateItem(objRef, true);
    this.evServ.events['cartUpdateEvent'].emit();
  }


  public isFirstComplectItem(i: number): boolean {
    const op = this.cart.displayOrderProducts[i];
    return (op.orderProduct.complect) && !(op.prevComplect === op.orderProduct.complect);
  }

  public isLastComplectItem(i: number): boolean {
    const op = this.cart.displayOrderProducts[i];
    return (op.orderProduct.complect)
      && (op.prevComplect === op.orderProduct.complect);
  }

  public isComplectDivisorItem(i: number): boolean {
    if (i === 0) return false;
    if (i === this.cart.displayOrderProducts.length-1) return false;

    const thisOp = this.isFirstComplectItem(i);
    const prevOp = this.isLastComplectItem(i-1);

    return (thisOp) && (prevOp);
  }

  public toHomePage() {
    this.navCtrl.setRoot('HomePage').catch(err => console.error(err));
  }

}
