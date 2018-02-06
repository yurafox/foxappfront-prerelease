import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PaymentSuccessPage} from './payment-success';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    PaymentSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentSuccessPage),
    ComponentsModule
  ],
  exports: [
    PaymentSuccessPage
  ]
})
export class PaymentSuccessPageModule {
}
