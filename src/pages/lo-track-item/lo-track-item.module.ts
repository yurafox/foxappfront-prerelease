import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoTrackItemPage } from './lo-track-item';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    LoTrackItemPage,
  ],
  imports: [
    IonicPageModule.forChild(LoTrackItemPage),
    ComponentsModule
  ],
  exports: [
    LoTrackItemPage
  ]
})
export class LoTrackItemPageModule {}
