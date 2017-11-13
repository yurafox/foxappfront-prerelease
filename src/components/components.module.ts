import { NgModule } from '@angular/core';
import { SearchBtnComponent } from './search-btn/search-btn';
import {IonicModule} from 'ionic-angular';
import { MainToolbarComponent } from './main-toolbar/main-toolbar';
import { ItemComponent } from './item/item';
import {PipesModule} from '../app/pipe/pipes.module';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ProductRatingComponent } from './product-rating/product-rating';


@NgModule({
	declarations: [
	  SearchBtnComponent,
    MainToolbarComponent,
    ItemComponent,
    ProductRatingComponent
  ],
	imports: [
    IonicModule,
    PipesModule,
    Ionic2RatingModule
  ],
	exports: [
	  SearchBtnComponent,
    MainToolbarComponent,
    ItemComponent,
    ProductRatingComponent
  ]
})
export class ComponentsModule {}
