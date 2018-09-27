import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { IDictionary } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { ProductReview } from '../../../model/product-review';
import { ReviewAnswer } from '../../../model/review-answer';
import { StoreReview } from '../../../model/store-review';
import {AbstractReviewRepository} from "../abstract/abstract-review-repository";

// <editor-fold desc="url const">
const productReviewsUrl = `${AppConstants.BASE_URL}/review/GetProductReviews`;
const clientProductReviewsUrl = `${AppConstants.BASE_URL}/review/HasClientProductReviewByProductId`;
const storeReviewsUrl = `${AppConstants.BASE_URL}/review/GetStoreReviews`;
const storeReviewsByStoreIdUrl = `${AppConstants.BASE_URL}/review/GetStoreReviewsByStoreId`;
const clientStoreReviewsByStoreIdUrl = `${AppConstants.BASE_URL}/review/HasClientStoreReviewByStoreId`;
const postProductReviewUrl = `${AppConstants.BASE_URL}/SaveReview/Product`;
const postStoreReviewUrl = `${AppConstants.BASE_URL}/SaveReview/Store`;
const updateProductReviewUrl = `${AppConstants.BASE_URL}/UpdateReview/Product`;
const updateStoreReviewUrl = `${AppConstants.BASE_URL}/UpdateReview/Store`;
// </editor-fold

@Injectable()
export class ReviewRepository extends AbstractReviewRepository {
  constructor(public http: Http, public connServ: ConnectivityService) {
    super();
  }

  public async getProductReviewsByProductId(productId: number): Promise<{ reviews: ProductReview[], idClient: number }> {
    try {
      const response = await this.http
        .get(`${productReviewsUrl}/${productId}`, RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const qProductsRevs = new Array<ProductReview>();
      let answers: IDictionary<ReviewAnswer[]> = {};
      if (data.productReviews != null) {
        for (let i = data.productReviews.length - 1; i > -1; i--) {
          let val = data.productReviews[i];
          let date = val.reviewDate.toString();

          if (val.idReview && val.idReview !== null) {
            if (!answers[val.idReview.toString()]) {
              answers[val.idReview.toString()] = [];
            }
            answers[val.idReview.toString()].push(new ReviewAnswer(
              val.id,
              val.idReview,
              val.idClient,
              val.user,
              new Date(date),
              val.reviewText
            ));
          }
        }
        if (data && data.productReviews) data.productReviews.forEach(val => {
          let date = val.reviewDate.toString();
          if (val.idReview === null) {
            if (answers[val.id.toString()]) {
              let review = new ProductReview(
                val.id,
                val.idProduct,
                val.idClient,
                val.user,
                new Date(date),
                val.reviewText,
                val.rating,
                val.advantages,
                val.disadvantages,
                val.upvotes,
                val.downvotes,
                answers[val.id.toString()]
              );
              review.vote = val.vote;
              qProductsRevs.push(review);
            } else {
              let review = new ProductReview(
                val.id,
                val.idProduct,
                val.idClient,
                val.user,
                new Date(date),
                val.reviewText,
                val.rating,
                val.advantages,
                val.disadvantages,
                val.upvotes,
                val.downvotes,
                []
              );
              review.vote = val.vote;
              qProductsRevs.push(review);
            }
          }
        })
      }
      return { reviews: qProductsRevs, idClient: data.currentUser };
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getHasClientProductReview(productId: number): Promise<{hasReview: boolean, idClient:number}> {
    try {
      const response = await this.http.get(`${clientProductReviewsUrl}/${productId}`, RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      return data;
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getHasClientStoreReview(storeId: number): Promise<{hasReview: boolean, idClient:number}> {
    try {
      const response = await this.http.get(`${clientStoreReviewsByStoreIdUrl}/${storeId}`, RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      return data;
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getStoreReviewsByStoreId(storeId: number): Promise<{ reviews: StoreReview[], idClient: number }> {
    try {
      const response = await this.http
        .get(`${storeReviewsByStoreIdUrl}/${storeId}`, RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      const storesRevs = new Array<StoreReview>();
      let answers: IDictionary<ReviewAnswer[]> = {};
      if (data.storeReviews != null) {
        for (let i = data.storeReviews.length - 1; i > -1; i--) {
          let val = data.storeReviews[i];
          let date = val.reviewDate.toString();
          if (val.idReview && val.idReview !== null) {
            if (!answers[val.idReview.toString()]) {
              answers[val.idReview.toString()] = [];
            }
            answers[val.idReview.toString()].push(new ReviewAnswer(
              val.id,
              val.idReview,
              val.idClient,
              val.user,
              new Date(date),
              val.reviewText
            ));
          }
        }
        if (data && data.storeReviews) data.storeReviews.forEach(val => {
          let date = val.reviewDate.toString();
          if (val.idReview === null) {
            if (answers[val.id.toString()]) {
              let storeRev = new StoreReview(
                val.id,
                val.idStore,
                val.idClient,
                val.user,
                new Date(date),
                val.reviewText,
                val.rating,
                val.advantages,
                val.disadvantages,
                val.upvotes,
                val.downvotes,
                answers[val.id.toString()]
              );
              storeRev.vote = val.vote;
              storesRevs.push(storeRev);
            } else {
              let storeRev = new StoreReview(
                val.id,
                val.idStore,
                val.idClient,
                val.user,
                new Date(date),
                val.reviewText,
                val.rating,
                val.advantages,
                val.disadvantages,
                val.upvotes,
                val.downvotes,
                []
              );
              storeRev.vote = val.vote;
              storesRevs.push(storeRev);
            }
          }
        })
      }
      return { reviews: storesRevs, idClient: data.currentUser };
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getStoreReviews(): Promise<{ reviews: StoreReview[], idClient: number }> {
    try {
      const response = await this.http
        .get(`${storeReviewsUrl}`, RequestFactory.makeAuthHeader()).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let storesRevs = new Array<StoreReview>();
      if (data.storeReviews != null) {
        let answers: IDictionary<ReviewAnswer[]> = {};
        for (let i = data.storeReviews.length - 1; i > -1; i--) {
          let val = data.storeReviews[i];
          let date = val.reviewDate.toString();
          if (val.idReview && val.idReview !== null) {
            if (!answers[val.idReview.toString()]) {
              answers[val.idReview.toString()] = [];
            }
            answers[val.idReview.toString()].push(new ReviewAnswer(
              val.id,
              val.idReview,
              val.idClient,
              val.user,
              new Date(date),
              val.reviewText
            ));
          }
        }
        if (data && data.storeReviews) data.storeReviews.forEach(val => {
          let date = val.reviewDate.toString();
          if (val.idReview === null) {
            if (answers[val.id.toString()]) {
              let storeRev = new StoreReview(
                val.id,
                val.idStore,
                val.idClient,
                val.user,
                new Date(date),
                val.reviewText,
                val.rating,
                val.advantages,
                val.disadvantages,
                val.upvotes,
                val.downvotes,
                answers[val.id.toString()]
              );
              storeRev.vote = val.vote;
              storesRevs.push(storeRev);
            } else {
              let storeRev = new StoreReview(
                val.id,
                val.idStore,
                val.idClient,
                val.user,
                new Date(date),
                val.reviewText,
                val.rating,
                val.advantages,
                val.disadvantages,
                val.upvotes,
                val.downvotes,
                []
              );
              storeRev.vote = val.vote;
              storesRevs.push(storeRev);
            }
          }
        });
      }
      return { reviews: storesRevs, idClient: data.currentUser };
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async postProductReview(productReview: ProductReview): Promise<ProductReview> {
    try {
      const response = await this.http.post(postProductReviewUrl, productReview, RequestFactory.makeAuthHeader())
        .toPromise();
      if (response.status !== 201 && response.status !== 200 && response.status !== 204) {
        throw new Error("server side status error");
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async postStoreReview(storeReview: StoreReview): Promise<StoreReview> {
    try {
      const response = await this.http.post(postStoreReviewUrl, storeReview, RequestFactory.makeAuthHeader())
        .toPromise();
      if (response.status !== 201 && response.status !== 200 && response.status !== 204) {
        throw new Error("server side status error");
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async updateProductReview(productReview: ProductReview): Promise<ProductReview> {
    try {
      const response = await this.http.post(updateProductReviewUrl, productReview, RequestFactory.makeAuthHeader()).toPromise();
      if (response.status !== 201 && response.status !== 200 && response.status !== 204) {
        throw new Error("server side status error");
      }
      let data = response.json();
      return data;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async updateStoreReview(storeReview: StoreReview): Promise<StoreReview> {
    try {
      const response = await this.http.post(updateStoreReviewUrl, storeReview, RequestFactory.makeAuthHeader()).toPromise();
      if (response.status !== 201 && response.status !== 200 && response.status !== 204) {
        throw new Error("server side status error");
      }
      let data = response.json();
      return data;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  // <editor-fold desc="error handler"
  public handleError(error?: Error): any {
    if (this.connServ.counter < 1) {
      this.connServ.handleNoConnection(error);
    }
  }
  // </editor-fold>
}
