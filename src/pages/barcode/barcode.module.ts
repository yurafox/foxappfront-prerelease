import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodePage } from './barcode';
import {ComponentsModule} from "../../components/components.module";
import {NgxQRCodeModule} from "ngx-qrcode2";

@NgModule({
  declarations: [
    BarcodePage,
  ],
  imports: [
    IonicPageModule.forChild(BarcodePage),
    ComponentsModule,
    NgxQRCodeModule
  ],
  exports: [
    BarcodePage
  ]
})
export class BarcodePageModule {}
