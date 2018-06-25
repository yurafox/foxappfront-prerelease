import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import {ComponentsModule} from '../../components/components.module';
import {SearchService} from '../../app/service/search-service';
import {DirectivesModule} from '../../app/directives/directives.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ComponentsModule,
    DirectivesModule
  ],
  exports: [
    HomePage
  ],
  providers: [
    SearchService
  ]
})
export class HomePageModule {}
