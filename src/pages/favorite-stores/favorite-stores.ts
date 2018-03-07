import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {City, Store} from "../../app/model";
import {AbstractDataRepository} from "../../app/service";

@IonicPage()
@Component({
  selector: 'page-favorite-stores',
  templateUrl: 'favorite-stores.html',
})
export class FavoriteStoresPage extends ComponentBase implements OnInit {

  stores: Array<{ city: City, store: Store, hasReviews?: boolean }>;

  constructor(private navCtrl: NavController, private repo: AbstractDataRepository, private alertCtrl: AlertController) {
    super();
    this.stores = [];
  }

  ngOnInit() {
    super.ngOnInit();
  }

  async ionViewDidLoad() {
    let favStoresIDs: number[] = this.userService.profile.favoriteStoresId;
    if (favStoresIDs && (favStoresIDs.length > 0)) {

      for (let i = 0; i < favStoresIDs.length; i++) {
        let store = await this.repo.getStoreById(favStoresIDs[i]);
        if (store) {
          let city = await this.repo.getCityById(store.idCity);
          if (city) {
            this.stores.push({city: city, store: store});
          }
        } else {
          console.log(`Couldn\'t get store with id: ${favStoresIDs[i]}`);
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
}
