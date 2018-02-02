import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDetailsPage } from './order-details';
import {ComponentsModule} from '../../components/components.module';
import {PipesModule} from '../../app/pipe/pipes.module';

@NgModule({
  declarations: [
    OrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderDetailsPage),
    ComponentsModule,
    PipesModule
  ],
})
export class OrderDetailsPageModule {}
