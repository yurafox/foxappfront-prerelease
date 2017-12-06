import {NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemReviewsPage } from './item-reviews';
import {ComponentsModule} from "../../components/components.module";
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
  declarations: [
    ItemReviewsPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemReviewsPage),
    ComponentsModule,
    Ionic2RatingModule
  ],
  exports: [
    ItemReviewsPage
  ]
})
export class ItemReviewsPageModule {}
