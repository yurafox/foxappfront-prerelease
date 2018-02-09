import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {AbstractDataRepository} from "../../app/service/repository/abstract/abstract-data-repository";
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
  fail: boolean;
  error: boolean;
  success: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private repo: AbstractDataRepository,
              private cart: CartService, private sanitizer: DomSanitizer) {
    super();
  }

  async ngOnInit() {
    this.document = await this.repo.getDataForRedirectToPaymaster(this.cart.order.id, this.cart.cartGrandTotal);
    //this.document = await this.repo.getDataForRedirectToPaymaster(1000, 5499); // For testing payment system TODO: Remove this
    if (this.document.form && (this.document.pay !== null)) {
      this.formInput = await this.sanitizer.bypassSecurityTrustHtml(this.document.form);
    }
  }

  toHomePage() {
    this.navCtrl.setRoot('HomePage').catch(err => console.error(err));
  }

}
