import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterPopoverPage } from './filter-popover';
import {ComponentsModule} from "../../components/components.module";
import {PipesModule} from "../../app/pipe/pipes.module";
import {DirectivesModule} from '../../app/directives/directives.module';

@NgModule({
  declarations: [
    FilterPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterPopoverPage),
    ComponentsModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    FilterPopoverPage
  ]
})
export class FilterPopoverPageModule {}
