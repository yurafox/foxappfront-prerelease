import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionPage } from './action';
import {ComponentsModule} from "../../components/components.module";
import {SearchService} from "../../app/service/index";

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
  ],
  providers: [
    SearchService
  ]
})
export class ActionPageModule {}
