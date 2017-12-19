import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShipAddressesPage } from './ship-addresses';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ShipAddressesPage,
  ],
  imports: [
    IonicPageModule.forChild(ShipAddressesPage),
    ComponentsModule
  ],
  exports: [
    ShipAddressesPage
  ]
})
export class ShipAddressesPageModule {}
