import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPage } from './checkout';
import {ComponentsModule} from '../../components/components.module';
import {PipesModule} from '../../app/pipe/pipes.module';

@NgModule({
  declarations: [
    CheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutPage),
    ComponentsModule,
    PipesModule
  ],
})
export class CheckoutPageModule {}
