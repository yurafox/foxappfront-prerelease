import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCreditCardPage } from './select-credit-card';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../app/directives/directives.module';

@NgModule({
  declarations: [
    SelectCreditCardPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectCreditCardPage),
    ComponentsModule,
    DirectivesModule
  ],
  exports: [
    SelectCreditCardPage,
  ]
})
export class SelectCreditCardPageModule {}
