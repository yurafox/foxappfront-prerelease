import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageNewsMenuPage } from './manage-news-menu';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ManageNewsMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageNewsMenuPage),
    ComponentsModule
  ],
})
export class ManageNewsMenuPageModule {}
