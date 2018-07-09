import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoveltyPage } from './novelty';
import {ComponentsModule} from "../../components/components.module";
import {DirectivesModule} from '../../app/directives/directives.module';

@NgModule({
  declarations: [
    NoveltyPage,
  ],
  imports: [
    IonicPageModule.forChild(NoveltyPage),
    ComponentsModule,
    DirectivesModule
  ],
  exports: [
    NoveltyPage
  ]
})
export class NoveltyPageModule {}
