import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { ComponentBase } from '../../components/component-extension/component-base';
import { CallNumber } from '@ionic-native/call-number';
import { Device } from '@ionic-native/device';

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage extends ComponentBase {

  constructor(public navCtrl: NavController, public device: Device, public numberCaller: CallNumber) {
    super();
    this.initLocalization();
  }

  callNumber() {
    if (this.device.cordova) this.numberCaller.callNumber('0800300353', true).catch(err => console.log('Error launching dialer', err));
  }

}
