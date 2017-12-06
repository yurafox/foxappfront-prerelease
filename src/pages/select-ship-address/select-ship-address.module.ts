import { NgModule } from '@angular/core';
import { SelectShipAddressPage } from './select-ship-address';
import { IonicPageModule } from 'ionic-angular';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    SelectShipAddressPage
  ],
  imports: [
    IonicPageModule.forChild(SelectShipAddressPage),
    ComponentsModule
  ],
  exports: [
    SelectShipAddressPage
  ]

})
export class SelectShipAddressPageModule {}
