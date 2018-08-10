import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsPage } from './news';
import {ComponentsModule} from "../../components/components.module";
import {PipesModule} from "../../app/pipe/pipes.module";
import {LazyLoadImagesModule} from 'ngx-lazy-load-images';

@NgModule({
  declarations: [
    NewsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsPage),
    ComponentsModule,
    PipesModule,
    LazyLoadImagesModule,
  ],
})
export class NewsPageModule
{
}
