import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterPopoverPage } from './filter-popover';
import {ComponentsModule} from "../../components/components.module";
import {PipesModule} from "../../app/pipe/pipes.module";

@NgModule({
  declarations: [
    FilterPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterPopoverPage),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    FilterPopoverPage
  ]
})
export class FilterPopoverPageModule {}
