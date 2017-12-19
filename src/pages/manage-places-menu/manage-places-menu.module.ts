import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagePlacesMenuPage } from './manage-places-menu';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ManagePlacesMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagePlacesMenuPage),
    ComponentsModule
  ],
  exports: [
    ManagePlacesMenuPage
  ]
})
export class ManagePlacesMenuPageModule {}
