import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, LoadingController} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {City} from '../../app/model/city';
import {Store} from '../../app/model/store';
import {StoreReview} from '../../app/model/store-review';
import {AbstractStoreRepository} from '../../app/service/repository/abstract/abstract-store-repository';
import {AbstractGeoRepository} from "../../app/service/repository/abstract/abstract-geo-repository";
import {AbstractReviewRepository} from "../../app/service/repository/abstract/abstract-review-repository";

export interface IStore {
  city: City;
  store: Store;
  reviews: Array<StoreReview>;
  cantShow: boolean;
  hasReviews?: boolean;
}

@IonicPage()
@Component({
  selector: 'page-favorite-stores',
  templateUrl: 'favorite-stores.html',
})
export class FavoriteStoresPage extends ComponentBase implements OnInit {

  stores: Array<IStore>;
  clientId: number = 0;
  dataLoaded:boolean;

  constructor(public navCtrl: NavController, public storeRepo: AbstractStoreRepository,
              public geoRepo: AbstractGeoRepository, public reviewRepo: AbstractReviewRepository,
              public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    super();
    this.initLocalization();
    this.stores = [];
    this.dataLoaded = false;
  }

  async ngOnInit() {
    super.ngOnInit();
    let content = this.locale['LoadingContent'] ? this.locale['LoadingContent'] : 'Пожалуйста, подождите...';
    let loading = this.loadingCtrl.create({
      content: content
    });
    try {
      loading.present().catch(console.error);
      let favStores: Store[] = await this.storeRepo.getFavoriteStores();
      if (favStores && favStores.length > 0) {
        for (let i = 0; i < favStores.length; i++) {
          let city = await this.geoRepo.getCityById(favStores[i].idCity);
          let store: IStore = { city: null, store: null, reviews: null, cantShow: false };
          store = { city: city, store: favStores[i], reviews: null, cantShow: false, hasReviews: false };
          let reviews = await this.reviewRepo.getStoreReviewsByStoreId(favStores[i].id);
          let hasClientReviews = await this.reviewRepo.getHasClientStoreReview(favStores[i].id);
          let revs = reviews.reviews;
          store.reviews = revs;
          if (!this.clientId) this.clientId = reviews.idClient;
          if (hasClientReviews && hasClientReviews != null && hasClientReviews.hasReview) {
            store.cantShow = hasClientReviews.hasReview;
          }
          store.hasReviews = !!(revs && (revs.length > 0));
          this.stores.push(store);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.dataLoaded = true;
      loading.dismiss().catch(console.error);
    }
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

  async deleteStore(item: IStore) {
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
            this.removeFavoriteStore(item.store.id).catch((err)=>console.error(`Couldn't remove favorite store: `+err));
          }
        },
        {
          text: cancel,
          handler: () => {
          }
        }
      ]
    });
    alert.present().catch(console.error);
  }

  navToMap(store: Store, city: City) {
    this.navCtrl.push('MapPage', {store: store, city: city, page: this}).catch(err => {
      console.log(`Couldn't navigate to MapPage with selected params: ${err}`);
    });
  }

  onShowReviewsClick(store: Store): void {
    this.navCtrl.push('ItemReviewsPage', {store: store, page:this}).catch(err => {
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

  async removeFavoriteStore(idStore:number) {
    if (idStore && (idStore > 0)) {
      let data = await this.storeRepo.deleteFavoriteStore(idStore);
      if (data && data !== 0 && data !== null) {
        for (let i = 0; i < this.stores.length; i++) {
          let store = this.stores[i];
          if (store.store.id === idStore) {
            this.stores.splice(i, 1);
          }
        }
      }
    }
  }
}
