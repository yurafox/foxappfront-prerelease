import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectPmtMethodPage } from './select-pmt-method';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    SelectPmtMethodPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectPmtMethodPage),
    ComponentsModule
  ],
  exports: [
    ComponentsModule
  ]
})
export class SelectPmtMethodPageModule {}
