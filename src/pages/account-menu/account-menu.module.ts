import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountMenuPage } from './account-menu';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AccountMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountMenuPage),
    ComponentsModule
  ],
  exports: [
    AccountMenuPage
  ]
})
export class AccountMenuPageModule {}
