import { NgModule } from '@angular/core';
import { ShippingOptionsPage } from './shipping-options';
import { IonicPageModule } from 'ionic-angular';
import {ComponentsModule} from '../../components/components.module';
import {PipesModule} from '../../app/pipe/pipes.module';

@NgModule({
  declarations: [
    ShippingOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShippingOptionsPage),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    ShippingOptionsPage
  ]
})
export class ShippingOptionsPageModule {}
