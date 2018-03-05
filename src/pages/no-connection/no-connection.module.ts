import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoConnectionPage } from './no-connection';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    NoConnectionPage,
  ],
  imports: [
    IonicPageModule.forChild(NoConnectionPage),
    ComponentsModule
  ],
  exports: [
    NoConnectionPage,
  ]
})
export class NoConnectionPageModule {}
