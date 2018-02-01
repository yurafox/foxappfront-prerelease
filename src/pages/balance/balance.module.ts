import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalancePage } from './balance';
import {ComponentsModule} from '../../components/components.module';
import {PipesModule} from '../../app/pipe/pipes.module';

@NgModule({
  declarations: [
    BalancePage,
  ],
  imports: [
    IonicPageModule.forChild(BalancePage),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    BalancePage
  ]
})
export class BalancePageModule {}
