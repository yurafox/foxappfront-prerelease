import {NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemReviewWritePage } from './item-review-write';
import {ComponentsModule} from "../../components/components.module";
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
  declarations: [
    ItemReviewWritePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemReviewWritePage),
    ComponentsModule,
    Ionic2RatingModule
  ],
  exports: [
    ItemReviewWritePage
  ]
})
export class ItemReviewWritePageModule {}
