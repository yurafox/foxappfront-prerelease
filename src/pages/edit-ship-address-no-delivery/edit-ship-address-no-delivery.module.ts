import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EditShipAddressNoDeliveryPage} from './edit-ship-address-no-delivery';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    EditShipAddressNoDeliveryPage,
  ],
  imports: [
    IonicPageModule.forChild(EditShipAddressNoDeliveryPage),
    ComponentsModule
  ],
  exports: [
    EditShipAddressNoDeliveryPage
  ]
})
export class EditShipAddressNoDeliveryPageModule {
}
