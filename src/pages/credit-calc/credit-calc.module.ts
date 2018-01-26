import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreditCalcPage } from './credit-calc';
import {ComponentsModule} from '../../components/components.module';
import {PipesModule} from '../../app/pipe/pipes.module';

@NgModule({
  declarations: [
    CreditCalcPage,
  ],
  imports: [
    IonicPageModule.forChild(CreditCalcPage),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    CreditCalcPage
  ]
})
export class CreditCalcPageModule {}
