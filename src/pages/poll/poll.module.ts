import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PollPage } from './poll';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    PollPage,
  ],
  imports: [
    IonicPageModule.forChild(PollPage),
    ComponentsModule
  ],
})
export class PollPageModule {}
