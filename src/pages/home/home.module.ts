import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import {ComponentsModule} from "../../components/components.module";
import {SearchService} from "../../app/service/index";


@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ComponentsModule
  ],
  exports: [
    HomePage
  ],
  providers: [
    SearchService
  ]
})
export class HomePageModule {}
