import { NgModule } from '@angular/core';
import { SearchBtnComponent } from './search-btn/search-btn';
import {IonicModule} from 'ionic-angular';
import { MainToolbarComponent } from './main-toolbar/main-toolbar';

@NgModule({
	declarations: [
	  SearchBtnComponent,
    MainToolbarComponent
  ],
	imports: [
    IonicModule
  ],
	exports: [
	  SearchBtnComponent,
    MainToolbarComponent
  ]
})
export class ComponentsModule {}
