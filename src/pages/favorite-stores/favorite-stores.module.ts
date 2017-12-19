import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoriteStoresPage } from './favorite-stores';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    FavoriteStoresPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoriteStoresPage),
    ComponentsModule
  ],
  exports: [
    FavoriteStoresPage
  ]
})
export class FavoriteStoresPageModule {}
