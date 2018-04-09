import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {OrdersFilterPage} from './your-orders-filter';
import {ComponentsModule} from '../../components/components.module';
import {PipesModule} from '../../app/pipe/pipes.module';

@NgModule({
  declarations: [
    OrdersFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdersFilterPage),
    ComponentsModule,
    PipesModule
  ],
})
export class OrdersFilterPageModule {}
