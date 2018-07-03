import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPage } from './checkout';
import {ComponentsModule} from '../../components/components.module';
import {PipesModule} from '../../app/pipe/pipes.module';
import { DirectivesModule } from '../../app/directive/directives.module';

@NgModule({
  declarations: [
    CheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutPage),
    ComponentsModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    CheckoutPage,
  ]
})
export class CheckoutPageModule {}
