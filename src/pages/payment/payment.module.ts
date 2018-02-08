import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentPage } from './payment';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    PaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentPage),
    ComponentsModule
  ],
  exports: [
    PaymentPage
  ]
})
export class PaymentPageModule {}
