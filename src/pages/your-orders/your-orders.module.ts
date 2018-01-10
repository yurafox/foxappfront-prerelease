import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersPage } from './your-orders';
import {ComponentsModule} from "../../components/components.module";
import {PipesModule} from "../../app/pipe/pipes.module";

@NgModule({
  declarations: [
    OrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdersPage),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    OrdersPage
  ]
})
export class OrdersPageModule {}
