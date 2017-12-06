import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemQuotesPage } from './item-quotes';
import {ComponentsModule} from "../../components/components.module";
import {PipesModule} from "../../app/pipe/pipes.module";

@NgModule({
  declarations: [
    ItemQuotesPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemQuotesPage),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    ItemQuotesPage
  ]
})
export class ItemQuotesPageModule {}
