import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPage } from './account';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AccountPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountPage),
    ComponentsModule
  ],
  exports: [
    AccountPage
  ]
})
export class AccountPageModule {}
