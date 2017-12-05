import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CityPopoverPage } from './city-popover';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    CityPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(CityPopoverPage),
    ComponentsModule
  ],
  exports: [
    CityPopoverPage
  ]
})
export class CityPopoverPageModule {}
