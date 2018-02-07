import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WarningViewPage } from './warning-view';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    WarningViewPage,
  ],
  imports: [
    IonicPageModule.forChild(WarningViewPage),
    ComponentsModule
  ],
  exports: [
    WarningViewPage
  ]
})
export class WarningViewPageModule {}
