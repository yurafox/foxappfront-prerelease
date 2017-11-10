import { NgModule } from '@angular/core';
import { SearchBtnComponent } from './search-btn/search-btn';
import {IonicModule} from 'ionic-angular';
import { MainToolbarComponent } from './main-toolbar/main-toolbar';
import { ItemComponent } from './item/item';
import {PipesModule} from '../app/pipe/pipes.module';
import { Ionic2RatingModule } from 'ionic2-rating';



@NgModule({
	declarations: [
	  SearchBtnComponent,
    MainToolbarComponent,
    ItemComponent
  ],
	imports: [
    IonicModule,
    PipesModule,
    Ionic2RatingModule
  ],
	exports: [
	  SearchBtnComponent,
    MainToolbarComponent,
    ItemComponent
  ]
})
export class ComponentsModule {}
