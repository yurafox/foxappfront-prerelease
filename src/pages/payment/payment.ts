import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ComponentBase } from "../../components/component-extension/component-base";
import { CartService } from "../../app/service/cart-service";
import { DomSanitizer } from "@angular/platform-browser";
import { AppConstants } from "../../app/app-constants";
import { AbstractDataRepository } from '../../app/service/repository/abstract/abstract-data-repository';
import { UserService } from '../../app/service/bll/user-service';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage extends ComponentBase implements OnInit {
  id: number;
  total: number;
  formInput: any;
  fail: boolean;
  error: boolean;
  success: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cart: CartService,
              public sanitizer: DomSanitizer, public changeDetector: ChangeDetectorRef,
              public repo: AbstractDataRepository, public alertCtrl: AlertController, public userService: UserService,
              public loadingCtrl: LoadingController) {
    super();
    this.initLocalization();
    (<any>window).appPage = this;
    this.formInput = '';
    if (this.cart.order) {
      if (this.cart.order.id && this.cart.cartGrandTotal) {
        this.id = this.cart.order.id;
        this.total = this.cart.cartGrandTotal;
      }
    } else {
      this.navCtrl.pop();
    }
  }

  async ngOnInit() {
    super.ngOnInit();
    if (this.navParams.data.result === 0) {
      this.success = true;
      this.formInput = null;
      let res = await this.repo.postOrder(this.cart.order);
      if ((res) && (res.isSuccess)) {
        this.cart.initCart();
      }
      else {
        let title = this.locale['AlertErrorTitle'];
        let message = this.locale['AlertErrorMessage']; // + ' ' + res.errorMessage;
        let btnText = this.locale['BtnErrorText'];
        let alert = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: [
            {
              text: btnText,
              handler: () => {
                this.cart.initCart().then(() => {
                  this.navCtrl.setRoot('CartPage');
                }
                );
              }
            }
          ]
        });
        alert.present();
      };
      this.changeDetector.detectChanges();
    } else if (this.navParams.data.result === 1) {
      this.fail = true;
      this.formInput = null;
      this.changeDetector.detectChanges();
    } else if (this.navParams.data.result === 2) {
      this.error = true;
      this.formInput = null;
      let res = await this.repo.postOrder(this.cart.order);
      if ((res) && (res.isSuccess)) {
        this.cart.initCart();
      }
      else {
        let title = this.locale['AlertErrorTitle'];
        let message = this.locale['AlertErrorMessage']; // + ' ' + res.errorMessage;
        let btnText = this.locale['BtnErrorText'];
        let alert = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: [
            {
              text: btnText,
              handler: () => {
                this.cart.initCart().then(() => {
                  this.navCtrl.setRoot('CartPage');
                }
                );
              }
            }
          ]
        });
        alert.present();
      };
      this.changeDetector.detectChanges();
    } else {
      let content = this.locale['LoadingContent'];
      let loading = this.loadingCtrl.create({
        content: content
      });
      loading.present();

      this.formInput = this.sanitizer.bypassSecurityTrustResourceUrl(`${AppConstants.BASE_PAYMENT_URL}/?id=${this.id}&total=${this.total}`);

      loading.dismiss();

      window.addEventListener('message', this.receiveMessage);
    }
  }

  toHomePage() {
    this.navCtrl.setRoot('HomePage',{pageMode: 1}).catch(err => console.error(err));
  }

  receiveMessage(event) {
    if (event.origin !== AppConstants.BASE_URL) {
      console.log('Event origin is not foxtrot');
      return;
    }
    switch (event.data) {
      case 'success': {
        (<any>window).appPage.navCtrl.setRoot('PaymentPage',{result:0});
        break;
      }
      case 'fail': {
        (<any>window).appPage.navCtrl.setRoot('PaymentPage',{result:1});
        break;
      }
      case 'error': {
        (<any>window).appPage.navCtrl.setRoot('PaymentPage',{result:2});
        break;
      }
      default: {
        (<any>window).appPage.navCtrl.setRoot('PaymentPage',{result:1});
        break;
      }
    }
  }

}
