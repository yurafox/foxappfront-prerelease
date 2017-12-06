import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemPropsPage } from './item-props';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ItemPropsPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemPropsPage),
    ComponentsModule
  ],
  exports: [
    ItemPropsPage
  ]
})
export class ItemPropsPageModule {}
