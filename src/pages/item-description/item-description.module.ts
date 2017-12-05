import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDescriptionPage } from './item-description';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ItemDescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemDescriptionPage),
    ComponentsModule
  ],
  exports: [
    ItemDescriptionPage
  ]
})
export class ItemDescriptionPageModule {}
