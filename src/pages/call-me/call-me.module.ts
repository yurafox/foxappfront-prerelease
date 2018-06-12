import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallMePage } from './call-me';
import {ComponentsModule} from '../../components/components.module';
import {PipesModule} from '../../app/pipe/pipes.module';

@NgModule({
  declarations: [
    CallMePage,
  ],
  imports: [
    IonicPageModule.forChild(CallMePage),
    ComponentsModule,
    PipesModule
  ],
})
export class CallMePageModule {}
