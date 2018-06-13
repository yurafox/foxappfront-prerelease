import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegalPolicyPage } from './legal-policy';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    LegalPolicyPage,
  ],
  imports: [
    IonicPageModule.forChild(LegalPolicyPage),
    ComponentsModule
  ],
})
export class LegalPolicyPageModule {}
