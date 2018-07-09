import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductComparePage } from './product-compare';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ProductComparePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductComparePage),
    ComponentsModule,
  ],
})
export class ProductComparePageModule {}
