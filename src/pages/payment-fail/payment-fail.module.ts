import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PaymentFailPage} from './payment-fail';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    PaymentFailPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentFailPage),
    ComponentsModule
  ],
  exports: [
    PaymentFailPage
  ]
})
export class PaymentFailPageModule {
}
