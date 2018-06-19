import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryPage } from './category';
import {ComponentsModule} from '../../components/components.module';
import {SearchService} from '../../app/service/search-service';

@NgModule({
  declarations: [
    CategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryPage),
    ComponentsModule
  ],
  exports: [
    CategoryPage
  ],
  providers: [
    SearchService
  ]
})
export class CategoryPageModule {}
