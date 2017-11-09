import {Component} from '@angular/core';

import {AlertController, NavController} from 'ionic-angular';

import {HomePage, SupportPage, ChangePasswordPage} from "../index"


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;

  constructor(public alertCtrl: AlertController, public nav: NavController) {

  }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Укажите новое имя',
      buttons: [
        'Отменить'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Изменить',
      handler: (data: any) => {
        // this.userData.setUsername(data.username);
        // this.getUsername();
        this.username = data.username; // mock
      }
    });

    alert.present();
  }

  getUsername() {
    /*this.userData.getUsername().then((username) => {
      this.username = username;
    });*/
    console.log('Clicked to get username');
  }

  // go to changing password page
  changePassword() {
    this.nav.push(ChangePasswordPage);
  }

  logout() {
    // this.userData.logout();
    // this.nav.setRoot('Login');
    console.log('Clicked to logout');
    this.nav.setRoot(HomePage);
  }

  support() {
    this.nav.push(SupportPage);
  }
}
