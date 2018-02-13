import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {CartService} from "../../app/service/cart-service";
import {DomSanitizer} from "@angular/platform-browser";

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage extends ComponentBase implements OnInit {
  document: any;
  formInput: any;
  id: number;
  total: number;
  fail: boolean;
  error: boolean;
  success: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cart: CartService,
              private sanitizer: DomSanitizer, private changeDetector: ChangeDetectorRef) {
    super();
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
    this.formInput = this.sanitizer.bypassSecurityTrustResourceUrl(`https://mobile.foxtrot.com.ua/paymaster/payment/?id=${this.id}&total=${this.total}`);
    window.addEventListener('message', this.receiveMessage);
  }

  toHomePage() {
    this.navCtrl.setRoot('HomePage').catch(err => console.error(err));
  }

  receiveMessage(event) {
    if (event.origin !== 'https://mobile.foxtrot.com.ua') {
      console.log('Event origin is not foxtrot');
      return;
    }
    switch (event.data) {
      case 'success': {
        (<any>window).appPage.success = true;
        (<any>window).appPage.formInput = null;
        (<any>window).appPage.changeDetector.detectChanges();
        break;
      }
      case 'fail': {
        (<any>window).appPage.fail = true;
        (<any>window).appPage.formInput = null;
        (<any>window).appPage.changeDetector.detectChanges();
        break;
      }
      case 'error': {
        (<any>window).appPage.error = true;
        (<any>window).appPage.formInput = null;
        (<any>window).appPage.changeDetector.detectChanges();
        break;
      }
      default: {
        (<any>window).appPage.toHomePage();
        console.log('Inappropriate data received');
        break;
      }
    }
  }

}
