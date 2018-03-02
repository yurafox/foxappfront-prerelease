import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComponentBase } from "../../components/component-extension/component-base";
import { City, Store, User } from "../../app/model";
import { AbstractAccountRepository, AbstractDataRepository } from "../../app/service";
import { MapPage } from "../";

@IonicPage()
@Component({
  selector: 'page-favorite-stores',
  templateUrl: 'favorite-stores.html',
})
export class FavoriteStoresPage extends ComponentBase implements OnInit {

  stores: Array<{ city: City, store: Store, hasReviews?: boolean }>;
  cities: City[];

  constructor(private navCtrl: NavController, private repo: AbstractDataRepository, private alertCtrl: AlertController) {
    super();
    this.stores = [];
  }

  ngOnInit() {
    super.ngOnInit();
  }

  async ionViewDidLoad() {
    this.cities = await this.repo.getCities();
    let favStoresIDs: number[] = this.userService.profile.favoriteStoresId;
    let favStores: Array<{ idCity: number, store: Store }> = [];
    if (favStoresIDs && (favStoresIDs.length > 0)) {
      let clen = this.cities.length;

      for (let i = 0; i < favStoresIDs.length; i++) {
        let store = await this.repo.getStoreById(favStoresIDs[i]);
        if (store) {
          favStores.push({ idCity: 0, store:null });
        } else {
          console.log(`Couldn\'t get store with id: ${favStoresIDs[i]}`);
        }
      }

      for (let i = 0; i < favStores.length; i++) {
        for (let j = 1; j < clen; j++) {
          if (this.cities[j].id === favStores[i].idCity) {
            this.stores.push({ city: this.cities[j], store: favStores[i].store });
          }
        }
      }
    } else {
      console.log(`Didn't load favoriteStoresId from storage`);
      //this.navCtrl.pop().catch(err => console.log(`Couldn't go back: ${err}`));
    }

    for (let store of this.stores) {
      let revs = await this.repo.getStoreReviewsByStoreId(store.store.id);
      store.hasReviews = !!(revs && (revs.length > 0));
    }
  }

  onIsPrimaryClick(item: Store) {
    this.stores.forEach(i => {
      i.store.isPrimary = false;
    }
    );
    item.isPrimary = true;
  }

  deleteStore(item: { city: City, store: Store, hasReviews: boolean }) {
    let title = this.locale['AlertTitle'];
    let message = this.locale['AlertMessage'];
    let cancel = this.locale['Cancel'];
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.stores.splice(this.stores.indexOf(item), 1);
            this.userService.removeFavoriteStoresId(item.store.id);
          }
        },
        {
          text: cancel,
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  navToMap(store: Store, city: City) {
    this.navCtrl.push('MapPage', { store: store, city: city, page: this }).catch(err => {
      console.log(`Couldn't navigate to MapPage with selected params: ${err}`);
    });
  }

  onShowReviewsClick(store: any): void {
    this.navCtrl.push('ItemReviewsPage', { store: store }).catch(err => {
      console.log(`Error navigating to ItemReviewPage: ${err}`);
    });
  }

  onWriteReviewClick(store: Store): void {
    if (store) {
      this.navCtrl.push('ItemReviewWritePage', store).catch(err => {
        console.log(`Error navigating to ItemReviewWritePage: ${err}`);
      });
    }

  }
}
