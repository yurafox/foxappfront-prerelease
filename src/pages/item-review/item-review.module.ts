import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemReviewPage } from './item-review';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ItemReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemReviewPage),
    ComponentsModule
  ],
  exports: [
    ItemReviewPage
  ]
})
export class ItemReviewPageModule {}
