import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {Store, User} from "../../app/model";
import {AbstractAccountRepository, AbstractDataRepository} from "../../app/service";

@IonicPage()
@Component({
  selector: 'page-favorite-stores',
  templateUrl: 'favorite-stores.html',
})
export class FavoriteStoresPage extends ComponentBase implements OnInit {

  ids = [];
  dataLoaded = false;
  stores: Store[];

  constructor(private navCtrl: NavController, private navParams: NavParams, private repo: AbstractDataRepository,
              private accrepo: AbstractAccountRepository, private alertCtrl: AlertController) {
    super();
    this.stores = [];
  }

  async ionViewDidLoad() {
    this.getFavStoresId().then(data => {
        // this.ids = data;
        this.dataLoaded = true;
        if (data) {
          for (let s of data) {
            this.getStore(s).then((datai) => {
              console.log(datai);
              this.stores.push(datai);
            }).catch(err => {
              console.log(`Didn't load: ${err}`)
            });
          }
        } else {
          console.log(`Didn't load favoriteStoresId from storage`);
        }
      }
    ).catch(err => {
      console.log(`Error: ${err}`);
      this.navCtrl.pop().catch(err => console.log(`Couldn't go back: ${err}`));
    });

  }


  ngOnInit() {
    super.ngOnInit();
  }

  async getFavStoresId(): Promise<number[]> {
    // let storeId = this.userService.profile.favoriteStoresId;
    let user: User = await this.accrepo.getUserById(+localStorage.getItem('id'), localStorage.getItem('token'));
    console.log(user);
    return user.favoriteStoresId;
  }

  async getStore(id: number): Promise<Store> {
    return await this.repo.getFoxStoreById(id);
  }

  onIsPrimaryClick(item: any) {
    this.stores.forEach(i => {
        i.isPrimary = false;
      }
    );
    item.isPrimary = true;
  }

  deleteStore(item: Store) {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure you want ot delete this address for your address book?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.stores.splice(this.stores.indexOf(item),1);
            if (this.stores.length > 0) {
              this.stores[0].isPrimary = true;
            }
          }
        },
        {
          text: 'Cancel',
          handler: () => {}
        }
      ]
    });
    alert.present();
  }

}
