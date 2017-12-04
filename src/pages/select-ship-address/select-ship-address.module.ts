import { NgModule } from '@angular/core';
import { SelectShipAddressPage } from './select-ship-address';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    SelectShipAddressPage
  ],
  imports: [
    IonicPageModule.forChild(SelectShipAddressPage)
  ],
  exports: [
    SelectShipAddressPage
  ]

})
export class SelectShipAddressPageModule {}
