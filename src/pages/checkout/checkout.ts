import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {CartService} from '../../app/service/cart-service';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {Http, Headers} from "@angular/http";

declare var PMWidget: any;

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage extends ComponentBase {

  dataLoaded = true;
  formInput: any;
  pmtMethodID: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cart: CartService,
              public repo: AbstractDataRepository, private modalCtrl: ModalController,
              private http: Http) {
    super();
    this.pmtMethodID = this.cart.pmtMethod.id;
  }

  validatePage(): {isValid: boolean, errors: string[]} {
    let err = [];
    if (this.cart.pmtMethod.id === 3)
      this.cart.validateLoan(this.cart.cartGrandTotal).validationErrors.forEach(i => {err.push(i)});
    this.cart.orderProducts.forEach(i => {
      if(i.errorMessage)
        err.push(i.errorMessage);
    });
    return {isValid: !(err.length>0), errors: err};
  }

  async onPlaceOrderClick() {
    console.log('Place Order!');
    /**
     * Pay Systems for PayMaster:
     * 21 - Visa/MasterCard;
     * 1  - WebMoney;
     * 6  - MoneXy
     **/
    if (this.pmtMethodID === 2) {
      this.formInput = await this.repo.getDataForRedirectToPaymaster(this.cart.order.id, this.cart.cartGrandTotal, 21);
      //this.navCtrl.push('PaymentPage',this.formInput);
      /*const modal = this.modalCtrl.create('PaymentPage',this.formInput);
      modal.present();
      modal.onDidDismiss(() => {console.log('dismissed')});*/
      const body = Object.keys(this.formInput).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(this.formInput[key]);
      }).join('&');
      let headers = new Headers();
      headers.set('Content-Type',
        'application/x-www-form-urlencoded');
      const val = await this.http.post(
        'https://lmi.paymaster.ua/',
        body,
        {headers: headers}
      ).toPromise().catch(err=>console.log(err));
      console.log(JSON.stringify(val));
    }
  }

  onAfterQtyUpdate(item: any, objRef:any): void {
    let j = 0;
    for (let i of this.cart.loResultDeliveryOptions) {
      if (i.idClientOrderProduct === objRef.id)  {
        break;
      }
      j++;
    }

    this.repo.getDeliveryCost(objRef, this.cart.loResultDeliveryOptions[j].loEntityId).then(r => {
        this.cart.loResultDeliveryOptions[j].deliveryCost = r;
      }
    );
    this.evServ.events['cartUpdateEvent'].emit();
  }

}
