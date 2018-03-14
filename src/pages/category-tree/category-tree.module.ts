import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryTreePage } from './category-tree';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    CategoryTreePage
  ],
  imports: [
    IonicPageModule.forChild(CategoryTreePage),
    ComponentsModule
  ],
  exports: [
    CategoryTreePage
  ]
})
export class CategoryTreePageModule {}
