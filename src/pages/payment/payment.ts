import {AfterViewInit, Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";

declare var PMWidget: any;

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage extends ComponentBase implements AfterViewInit {

  frameInput: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    super();
    this.frameInput = this.navParams.data;
  }

  ngAfterViewInit() {
    let data = this.navParams.data;
    let lang: string;
    let _nav = this.navCtrl;
    switch (this.userService.lang) {
      case 1: {lang = 'ru'; break;}
      case 2: {lang = 'uk'; break;}
      case 3: {lang = 'en'; break;}
      default: lang = 'ru';
    }
    this.platform.ready().then(() => {
      PMWidget.init({
        embedTarget: '#paymaster',
        closeOnSuccess: true,
        closeOnFail: true,
        mode: 'embed',
        params: {
          "LMI_MERCHANT_ID":    data.LMI_MERCHANT_ID,
          "LMI_PAYMENT_NO":     data.LMI_PAYMENT_NO,
          "LMI_PAYMENT_AMOUNT": data.LMI_PAYMENT_AMOUNT,
          "LMI_PAYMENT_DESC":   data.LMI_PAYMENT_DESC
        },
        language: lang
      })
        .on('ready', function () {
          console.log('READY');
        })
        .on('success', function () {
          console.log('SUCCESS');
          _nav.push('PaymentSuccessPage');
        })
        .on('fail', function (params) {
          console.log('FAIL ' + params.message);
          _nav.push('PaymentFailPage', 'fail');
        })
        .on('close', function () {
          console.log('CLOSE');
          _nav.push('PaymentFailPage', 'close');
        })
        .on('error', function () {
          console.log('ERROR');
          _nav.push('PaymentFailPage', 'error');
        })
      ;
    });
  }
}
