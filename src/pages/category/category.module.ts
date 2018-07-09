import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryPage } from './category';
import {ComponentsModule} from '../../components/components.module';
import {SearchService} from '../../app/service/search-service';
import {DirectivesModule} from '../../app/directives/directives.module';

@NgModule({
  declarations: [
    CategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryPage),
    ComponentsModule,
    DirectivesModule
  ],
  exports: [
    CategoryPage
  ],
  providers: [
    SearchService
  ]
})
export class CategoryPageModule {}
