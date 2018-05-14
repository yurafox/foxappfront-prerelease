import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactsPage } from './contacts';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ContactsPage
  ],
  imports: [
    IonicPageModule.forChild(ContactsPage),
    ComponentsModule
  ],
  exports: [
    ContactsPage
  ]
})
export class ContactsPageModule {}
