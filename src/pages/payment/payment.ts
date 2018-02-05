import {AfterViewInit, Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";

declare var PMWidget: any;

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage extends ComponentBase implements AfterViewInit {

  frameInput: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
    this.frameInput = this.navParams.data;
  }

  ngAfterViewInit() {
    let lang: string;
    switch(this.userService.lang) {
      case 1: {lang = 'ru'; break;}
      case 2: {lang = 'uk'; break;}
      case 3: {lang = 'en'; break;}
      default: lang = 'ru';
    }
    PMWidget.init({
      embedTarget: '#paymaster',
      closeOnSuccess: true,
      closeOnFail: true,
      mode: 'embed',
      params: {
        "LMI_MERCHANT_ID":    this.frameInput.LMI_MERCHANT_ID,
        "LMI_PAYMENT_NO":     this.frameInput.LMI_PAYMENT_NO,
        "LMI_PAYMENT_AMOUNT": this.frameInput.LMI_PAYMENT_AMOUNT,
        "LMI_PAYMENT_DESC":   this.frameInput.LMI_PAYMENT_DESC
      },
      language: lang
    })
      .on('ready', function() {
        console.log('READY');
      })
      .on('success', function() {
        console.log('SUCCESS');
      })
      .on('fail', function(params) {
        console.log('FAIL ' + params.message);
      })
      .on('close', function() {
        console.log('CLOSE');
      })
      .on('error', function() {
        console.log('ERROR');
      })
    ;
  }
}
