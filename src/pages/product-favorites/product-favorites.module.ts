import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductFavoritesPage } from './product-favorites';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ProductFavoritesPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductFavoritesPage),
    ComponentsModule,
  ],
})
export class ProductFavoritesPageModule {}
