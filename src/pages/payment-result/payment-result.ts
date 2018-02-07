import {AfterViewInit, Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {AbstractDataRepository} from "../../app/service/repository/abstract/abstract-data-repository";
import {CartService} from "../../app/service/cart-service";
import {DomSanitizer} from "@angular/platform-browser";

@IonicPage()
@Component({
  selector: 'page-payment-result',
  templateUrl: 'payment-result.html',
})
export class PaymentResultPage extends ComponentBase implements AfterViewInit, OnInit {
  document: any;
  formInput: any;
  fail: any;
  error: any;
  success: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private repo: AbstractDataRepository,
              private cart: CartService, private sanitizer: DomSanitizer) {
    super();
  }

  async ngOnInit() {
    this.document = await this.repo.getDataForRedirectToPaymaster(this.cart.order.id, this.cart.cartGrandTotal, 21);
    console.log(this.document.pay);
    if (this.document.pay && (this.document.pay !== null)) {
      let iframe = document.getElementById('iframe');
      this.formInput = this.sanitizer.bypassSecurityTrustHtml(this.document.pay);
      iframe.innerHTML = this.formInput;
    }
  }

  async ngAfterViewInit() {
  }

  toHomePage() {
    this.navCtrl.setRoot('HomePage').catch(err => console.error(err));
  }

}
