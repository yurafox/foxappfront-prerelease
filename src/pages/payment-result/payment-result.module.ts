import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentResultPage } from './payment-result';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    PaymentResultPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentResultPage),
    ComponentsModule
  ],
  exports: [
    PaymentResultPage
  ]
})
export class PaymentResultPageModule {}
