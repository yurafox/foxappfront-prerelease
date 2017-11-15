import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SearchBtnComponent } from './search-btn/search-btn';
import {IonicModule} from 'ionic-angular';
import { MainToolbarComponent } from './main-toolbar/main-toolbar';
import { ItemComponent } from './item/item';
import {PipesModule} from '../app/pipe/pipes.module';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ProductRatingComponent } from './product-rating/product-rating';
import { ItemPropsComponent } from './item-props/item-props';
import { ItemDescriptionComponent } from './item-description/item-description';
import { ItemReviewComponent } from './item-review/item-review';
import { ReadMoreComponent } from './read-more/read-more';
import { ItemsListComponent } from './items-list/items-list';



@NgModule({
	declarations: [
	  SearchBtnComponent,
    MainToolbarComponent,
    ItemComponent,
    ProductRatingComponent,
    ItemPropsComponent,
    ItemDescriptionComponent,
    ItemReviewComponent,
    ReadMoreComponent,
    ItemsListComponent
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
    ProductRatingComponent,
    ItemPropsComponent,
    ItemDescriptionComponent,
    ItemReviewComponent,
    ReadMoreComponent,
    ItemsListComponent
  ]
})
export class ComponentsModule {}
