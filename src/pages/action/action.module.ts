import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionPage } from './action';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ActionPage,
  ],
  imports: [
    IonicPageModule.forChild(ActionPage),
    ComponentsModule
  ],
  exports: [
    ActionPage
  ]
})
export class ActionPageModule {}
