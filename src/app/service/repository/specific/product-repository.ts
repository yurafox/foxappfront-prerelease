import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {retry} from "rxjs/operators";
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import CacheProvider = Providers.CacheProvider;
import { Providers } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { Product } from '../../../model/product';
import { ProductPropValue } from '../../../model/product-prop-value';
import { PropEnumList } from '../../../model/prop-enum-list';
import { Prop } from '../../../model/prop';
import {AbstractProductRepository} from "../abstract/abstract-product-repository";
import {AppDataRepository} from "./app-data-repository";

// <editor-fold desc="url const">
const productDescriptionsUrl = `${AppConstants.BASE_URL}/product/getProductDescription`;
const productsUrl = `${AppConstants.BASE_URL}/product`;
const productImagesUrl = `${AppConstants.BASE_URL}/product/getProductImages`;
const getProductsByActionUrl = `${AppConstants.BASE_URL}/product/GetByAction`;
const notifyOnProductArrivalUrl = `${AppConstants.BASE_URL}/product/NotifyOnProductArrival`;
// </editor-fold

@Injectable()
export class ProductRepository extends AbstractProductRepository {
  constructor(public http: HttpClient, public connServ: ConnectivityService, private dataRepo: AppDataRepository) {
    super();
  }

  public async searchProducts(srchString: string): Promise<Product[]> {
    try {
      if (!AppConstants.USE_PRODUCTION) {
        const response: any = await this.http.get(productsUrl, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();
        const data = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        const products = new Array<Product>();

        if (data != null) {
          for (let val of data) {
            let props = new Array<ProductPropValue>();
            if (val.props && val.props.length !== 0) {
              props = this.getPropValuefromProduct(val);
            }

            // create current product
            const productItem: Product = new Product(
              val.id,
              val.name,
              val.price,
              val.oldPrice,
              val.bonuses,
              val.manufacturerId,
              props,
              val.imageUrl,
              val.rating,
              val.recall,
              val.supplOffers,
              val.description,
              val.slideImageUrls,
              val.barcode,
              val.valueQP,
              val.status,
              val.site_status
            );

            let mnf = await (<any>productItem).manufacturer_p;
            if (
              this.search(mnf.name, srchString) ||
              this.search(productItem.id.toString(), srchString) ||
              this.search(productItem.name, srchString) ||
              this.search(productItem.barcode, srchString)
            ) {
              products.push(productItem);
            }
          }
        }
        return products;
      }
      else {
        const response: any = await this.http
          .get(productsUrl, {params: this.createSearchParams([{ key: "srch", value: srchString }]), observe: "response"})
          .pipe(retry(3)).toPromise();
        const data = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        const products = new Array<Product>();

        if (data != null) {
          for (let val of data) {
            let props = new Array<ProductPropValue>();
            if (val.props && val.props.length !== 0) {
              props = this.getPropValuefromProduct(val);
            }

            // create current product
            const productItem: Product = new Product(
              val.id,
              val.name,
              val.price,
              val.oldPrice,
              val.bonuses,
              val.manufacturerId,
              props,
              val.imageUrl,
              val.rating,
              val.recall,
              val.supplOffers,
              val.description,
              val.slideImageUrls,
              val.barcode,
              val.valueQP,
              val.status,
              val.site_status
            );
            products.push(productItem);
          }
          return products;
        }
      }
    }
    catch (err) {
      await this.handleError(err);
    }
  }

  public getProductFromResponse(data: any): Product {
    if (data != null && data.length !== 0) {
      const prod: Product = new Product();
      let props = new Array<ProductPropValue>();
      if (data.props && data.props.length !== 0) {
        props = this.getPropValuefromProduct(data);
      }
      prod.id = data.id;
      prod.name = data.name;
      prod.price = data.price;
      prod.manufacturerId = data.manufacturerId;
      prod.props = props;
      prod.imageUrl = data.imageUrl;
      prod.rating = data.rating;
      prod.recall = data.recall;
      prod.supplOffers = data.supplOffers;
      prod.description = data.description;
      prod.slideImageUrls = data.slideImageUrls;
      prod.barcode = data.barcode;
      prod.valueQP = data.valueQP;
      prod.oldPrice = data.oldPrice;
      prod.bonuses = data.bonuses;
      prod.status = data.status;
      prod.site_status = data.site_status;
      return prod;
    }
    else return null;
  }

  public async getProductById(productId: number): Promise<Product> {
    if (!productId) return null;
    try {
      const id: string = productId.toString();
      // <editor-fold desc="id in cache is empty">
      if (this.dataRepo.cache.Products.HasNotValidCachedValue(id)) {
        const entity: Providers.CacheDataContainer<Product> = this.dataRepo.cache.Products.Item(id);
        const prod: Product = (entity) ? entity.item : new Product();

        if (!entity) {
          if (CacheProvider.Settings) this.dataRepo.cache.Products.Add(id, { item: prod, expire: Date.now() + CacheProvider.Settings.product.expire});
        }

        // change current reference
        else
        if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.product.expire;

        // http request
        const response: any = await this.http
          .get(productsUrl + `/${id}`, RequestFactory.makeAuthHeader())
          .pipe(retry(3)).toPromise();

        // response data binding
        let data: any = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        const _prod = this.getProductFromResponse(data);

        if (_prod != null) {
          prod.id = _prod.id;
          prod.name = _prod.name;
          prod.price = _prod.price;
          prod.manufacturerId = _prod.manufacturerId;
          prod.props = _prod.props;
          prod.imageUrl = _prod.imageUrl;
          prod.rating = _prod.rating;
          prod.recall = _prod.recall;
          prod.supplOffers = _prod.supplOffers;
          prod.description = _prod.description;
          prod.slideImageUrls = _prod.slideImageUrls;
          prod.barcode = _prod.barcode;
          prod.valueQP = _prod.valueQP;
          prod.status = _prod.status;
          prod.oldPrice = _prod.oldPrice;
          prod.bonuses = _prod.bonuses;
          prod.site_status = _prod.site_status;
          return prod;
        }

        return this.dataRepo.cache.Products.Remove(id).item;

      } else {
        // </editor-fold>
        return this.dataRepo.cache.Products.Item(id).item;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getProductDescription(id: number): Promise<string> {
    try {
      const _id = id.toString();
      const response: any = await this.http.get(productDescriptionsUrl + `/${_id}`, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();
      let data: any = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        return data.description;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getProductImages(id: number): Promise<string[]> {
    try {
      let res = [];
      let data: any = null;
      const _id = id.toString();
      const response: any = await this.http.get(productImagesUrl + `/${_id}`, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();
      if (response) {
        data = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data != null) {
          if (data && data.images) data.images.forEach(x => {
              res.push(x);
            }
          );
        }
      }
      return res;
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async getProductsByActionId(actionId: number): Promise<Product[]> {
    try {
      const response: any = await this.http
        .get(`${getProductsByActionUrl}/${actionId}`, RequestFactory.makeAuthHeader())
        .pipe(retry(3)).toPromise();

      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const products = new Array<Product>();
      if (data != null) {
        if (data) data.forEach(val => {
          let props = new Array<ProductPropValue>();
          if (val.props && val.props.length !== 0) {
            props = this.getPropValuefromProduct(val);
          }

          // create current product
          const productItem: Product = new Product(
            val.id,
            val.name,
            val.price,
            val.oldPrice,
            val.bonuses,
            val.manufacturerId,
            props,
            val.imageUrl,
            val.rating,
            val.recall,
            val.supplOffers,
            val.description,
            val.slideImageUrls,
            val.barcode
          );

          products.push(productItem);
        });
      }
      return products;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async notifyOnProductArrival(email: string, productId: number) {
    try {
      const response: any = await this.http
        .post(notifyOnProductArrivalUrl, { email: email, productId: productId },
          RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

      if (response.status !== 201) {
        throw new Error("server side status error");
      }

    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getProducts(urlQuery: string,
                           cacheForce: boolean): Promise<Product[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.dataRepo.cache.Products.HasNotValidCachedRange() || cacheForce === true) {
        const response: any = await this.http
          .get(productsUrl, RequestFactory.makeSearch([{ key: "url", value: urlQuery }]))
          .pipe(retry(3)).toPromise();

        const data = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        const products = new Array<Product>();
        if (data != null) {
          if (data) data.forEach(val => {
            let props = new Array<ProductPropValue>();
            if (val.props && val.props.length !== 0) {
              props = this.getPropValuefromProduct(val);
            }

            // create current product
            const productItem: Product = new Product(
              val.id,
              val.name,
              val.price,
              val.oldPrice,
              val.bonuses,
              val.manufacturerId,
              props,
              val.imageUrl,
              val.rating,
              val.recall,
              val.supplOffers,
              val.description,
              val.slideImageUrls,
              val.barcode,
              val.valueQP,
              val.status,
              val.site_status
            );

            products.push(productItem);

            // add product to cashe
            if (CacheProvider.Settings) this.dataRepo.cache.Products.Add(productItem.id.toString(), { item: productItem, expire: Date.now() + CacheProvider.Settings.product.expire });
          });
        }
        return products;
      } else {
        // </editor-fold>
        return this.dataRepo.cache.Products.Values();
      }
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

  // <editor-fold desc="url search factory">
  public createSearchParams(params: Array<{ key: string; value: string }>): HttpParams {
    let searchParams = new HttpParams();
    if (params) params.forEach(val => {
      searchParams = searchParams.set(val.key, val.value);
    });

    return searchParams;
  }
  // </editor-fold>

  // <editor-fold desc="get product prop value from product"
  public getPropValuefromProduct(product: any): Array<ProductPropValue> {
    const props = new Array<ProductPropValue>();
    if (product && product.props) product.props.forEach(val => {
      let enumVal =
        val.prop_Value_Enum !== null
          ? new PropEnumList(
          val.prop_Value_Enum.id,
          this.getSingleProp(val.prop_Value_Enum.id_Prop),
          val.prop_Value_Enum.name,
          val.prop_Value_Enum.list_Index,
          val.prop_Value_Enum.bit_Index,
          val.prop_Value_Enum.url
          )
          : null;

      props.push(
        new ProductPropValue(
          val.id,
          val.id_Product,
          this.getSingleProp(val.id_Prop),
          val.prop_Value_Str,
          val.prop_Value_Number,
          val.prop_Value_Bool,
          enumVal,
          val.prop_Value_Long,
          val.pVal,
          val.id_Measure_Unit,
          //
          val.idx,
          val.out_bmask
        )
      );
    });

    return props;
  }
  // </editor-fold>

  // <editor-fold desc="get single prop from parent container"
  public getSingleProp(val: any): Prop {
    return new Prop(
      val.id,
      val.name,
      val.prop_type,
      val.is_Multi_Select,
      val.url //,
      //val.predestination,
    );
  }
  // </editor-fold>

  // <editor-fold desc="inspect cache predicate"
  public isEmpty<T>(value: T) {
    return value === undefined;
  }
  // </editor-fold>

  search(textToSearch: string, srchVal: string): boolean {
    if (textToSearch && srchVal) {
      let ar = srchVal.toLowerCase().split(" ");
      let i = 0;
      if (ar) ar.forEach(str => {
        if (!(textToSearch.toLowerCase().indexOf(str) == -1)) {
          i++;
        }
      });
      if (i == ar.length) return true;
    } else return false;
  }

}
