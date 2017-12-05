import { NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetailPage } from './item-detail';
import {ComponentsModule} from "../../components/components.module";
import {PipesModule} from "../../app/pipe/pipes.module";
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
  declarations: [
    ItemDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetailPage),
    ComponentsModule,
    PipesModule,
    Ionic2RatingModule
  ],
  exports: [
    ItemDetailPage
  ]
})
export class ItemDetailPageModule {}
