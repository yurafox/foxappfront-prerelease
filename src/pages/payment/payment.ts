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
    (<any>window).windowLocation = window.location.href;
    (<any>window).appPage = this;
    this.formInput = '';
    if (this.cart.order) {
      if (this.cart.order.id && this.cart.cartGrandTotal) { // for test purpose TODO: Remove this 2 if
        this.id = this.cart.order.id;
        this.total = this.cart.cartGrandTotal;
      } else { // for test purpose TODO: Remove this else
        this.id = 1;
        this.total = 1.99;
      }
    } else { // for test purpose TODO: Remove this else
      this.id = 1;
      this.total = 1.99;
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
        console.log('success'); //TODO: Remove
        //window.location.href = (<any>window).windowLocation;
        console.log((<any>window).appPage);
        (<any>window).appPage.success = true;
        (<any>window).appPage.formInput = null;
        (<any>window).appPage.changeDetector.detectChanges();
        break;
      }
      case 'fail': {
        console.log('fail'); //TODO: Remove
        window.location.href = (<any>window).windowLocation;
        break;
      }
      case 'error': {
        console.log('error'); //TODO: Remove
        window.location.href = (<any>window).windowLocation;
        break;
      }
      default: {
        console.log('Inappropriate data received');
        break;
      }
    }
  }

}
