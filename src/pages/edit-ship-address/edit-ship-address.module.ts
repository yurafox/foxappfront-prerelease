import { NgModule } from '@angular/core';
import {EditShipAddressPage} from './edit-ship-address';
import{ IonicPageModule } from 'ionic-angular';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    EditShipAddressPage
  ],
  imports: [
    IonicPageModule.forChild(EditShipAddressPage),
    ComponentsModule
  ],
  exports: [
    EditShipAddressPage
  ]

})
export class EditShipAddressPageModule {}
