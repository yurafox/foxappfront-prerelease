import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersPage } from './your-orders';
import {ComponentsModule} from "../../components/components.module";
import {PipesModule} from "../../app/pipe/pipes.module";
import {Ionic2RatingModule} from "ionic2-rating";
import {LazyLoadImagesModule} from 'ngx-lazy-load-images';

@NgModule({
  declarations: [
    OrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdersPage),
    ComponentsModule,
    PipesModule,
    Ionic2RatingModule,
    LazyLoadImagesModule
  ],
  exports: [
    OrdersPage
  ]
})
export class OrdersPageModule {}
