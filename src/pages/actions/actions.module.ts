import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionsPage } from './actions';
import {ComponentsModule} from "../../components/components.module";
@NgModule({
  declarations: [
    ActionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ActionsPage),
    ComponentsModule
  ],
  exports: [
    ActionsPage
  ]
})
export class ActionsPageModule {}
