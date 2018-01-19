import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoveltyPage } from './novelty';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    NoveltyPage,
  ],
  imports: [
    IonicPageModule.forChild(NoveltyPage),
    ComponentsModule
  ],
  exports: [
    NoveltyPage
  ]
})
export class NoveltyPageModule {}
