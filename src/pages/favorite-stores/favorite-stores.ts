import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {City, Store} from "../../app/model";
import {AbstractDataRepository} from "../../app/service";
import {IDictionary} from "../../app/core/app-core";

export interface IStore {
  city: City;
  store: Store;
  hasReviews?: boolean;
}

@IonicPage()
@Component({
  selector: 'page-favorite-stores',
  templateUrl: 'favorite-stores.html',
})
export class FavoriteStoresPage extends ComponentBase implements OnInit {

  stores: Array<IStore>;

  constructor(private navCtrl: NavController, private repo: AbstractDataRepository, private alertCtrl: AlertController) {
    super();
    this.stores = [];
  }

  async ngOnInit() {
    super.ngOnInit();
    let favStores: Store[] = await this.repo.getFavoriteStores();
    if (favStores && favStores.length > 0) {
      for (let i = 0; i < favStores.length; i++) {
        let city = await this.repo.getCityById(favStores[i].idCity);
        let store: IStore = {city: null, store: null};
        store = {city: city, store: favStores[i], hasReviews: false};
        let revs = await this.repo.getStoreReviewsByStoreId(store.store.id);
        store.hasReviews = !!(revs && (revs.length > 0));
        this.stores.push(store);
      }
    }
  }

  async ionViewDidLoad() {
    /*for (let store of this.stores) {
      let revs = await this.repo.getStoreReviewsByStoreId(store.store.id);
      store.hasReviews = !!(revs && (revs.length > 0));
    }*/
  }

  onIsPrimaryClick(item: Store) {
    if (this.stores) {
      this.stores.forEach(i => {
          i.store.isPrimary = false;
        }
      );
      item.isPrimary = true;
    }
  }

  deleteStore(item: IStore) {
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
            this.removeFavoriteStore(item.store.id); console.log(item.store.id);
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
    this.navCtrl.push('MapPage', {store: store, city: city, page: this}).catch(err => {
      console.log(`Couldn't navigate to MapPage with selected params: ${err}`);
    });
  }

  onShowReviewsClick(store: any): void {
    this.navCtrl.push('ItemReviewsPage', {store: store}).catch(err => {
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

  removeFavoriteStore(idStore:number) {
    this.repo.deleteFavoriteStore(idStore).then(() => {
      for (let i = 0; i < this.stores.length; i++) {
        let store = this.stores[i];
        if (store.store.id === idStore) {
          this.stores.splice(i, 1);
        }
      }
    });
  }
}
