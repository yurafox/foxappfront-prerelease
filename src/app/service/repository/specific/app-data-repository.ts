import {Injectable} from '@angular/core';
import {AbstractDataRepository} from '../../index';
import {
  QuotationProduct,
  Product,
  Manufacturer,
  ProductPropValue,
  Prop,
  PropEnumList,
  Quotation,
  Supplier,
  Currency
} from '../../../model/index';

import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Providers} from '../../../core/app-core';
import CacheProvider = Providers.CacheProvider;

// <editor-fold desc="url const">
const currenciesUrl = '/api/mcurrencies';
const productsUrl = '/api/mproducts';
const quotationProductsUrl = '/api/mquotationProducts';
const quotationsUrl = '/api/mquotation';
const suppliersUrl = '/api/msuppliers';

// </editor-fold

@Injectable()
export class AppDataRepository extends AbstractDataRepository {
  private cache: CacheProvider = new CacheProvider();

  constructor(private http: Http) {
    super();
  }

  public async getProducts(urlQuery: string, cacheForce: boolean): Promise<Product[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.cache.Products.Count() === 0 || cacheForce === true) {
        const response = await this.http.get(productsUrl,
          {search: this.createSearchParams([{key: 'url', value: urlQuery}])}).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error('server side status error');
        }
        const products = new Array<Product>();
        if (data != null) {
          data.forEach((val) => {
            let props = new Array<ProductPropValue>();
            if (val.props && val.props.length !== 0) {
              props = this.getPropValuefromProduct(val);
            }

            // create current product
            const productItem: Product = new Product(val.id, val.name, val.price,
              new Manufacturer(val.manufacturer.id, val.manufacturer.name),
              props, val.imageUrl, val.rating, val.recall, val.supplOffers);

            products.push(productItem);

            // add product to cashe
            this.cache.Products.Add(productItem.id.toString(), productItem);
          });
        }
        return products;
      }
      // </editor-fold>
      else {
        return this.cache.Products.Values();
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getQuotationProductsByProductId(productId: number): Promise<QuotationProduct[]> {
    try {

      const response = await this.http.get(quotationProductsUrl,
        {search: this.createSearchParams([{key: 'idProduct', value: productId.toString()}])}).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error('server side status error');
      }
      const qProducts = new Array<QuotationProduct>();
      if (data != null) {
        data.forEach((val) => qProducts.push(new QuotationProduct(val.id, val.idQuotation, val.idProduct, val.price,
          val.maxDeliveryDays, val.stockQuant)));
      }
      return qProducts;

    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getProductById(productId: number): Promise<Product> {
    try {
      const prod: Product = new Product();
      const id: string = productId.toString();
      // <editor-fold desc="id in cache is empty">
      if (this.isEmpty(this.cache.Products.Item(id))) {
        this.cache.Products.Add(id, prod);

        // http request
        const response = await this.http.get(productsUrl,
          {search: this.createSearchParams([{key: 'id', value: productId.toString()}])}).toPromise();

        // response data binding
        let data: any = response.json();
        if (response.status !== 200) {
          throw new Error('server side status error');
        }

        if (data != null && data.length !== 0) {
          data = data[0]; // ---> single data make Array container
          let props = new Array<ProductPropValue>();
          if (data.props && data.props.length !== 0) {
            props = this.getPropValuefromProduct(data);
          }
          /*prod = new Product(data.id, data.name, data.price, new Manufacturer(data.manufacturer.id, data.manufacturer.name),
            props, data.imageUrl, data.rating, data.recall, data.supplOffers);*/

          // product insert
          prod.id = data.id;
          prod.name = data.name;
          prod.price = data.price;
          prod.manufacturer = new Manufacturer(data.manufacturer.id, data.manufacturer.name);
          prod.Props = props;
          prod.imageUrl = data.imageUrl;
          prod.rating = data.rating;
          prod.recall = data.recall;
          prod.supplOffers = data.supplOffers;

          // add to cache
          this.cache.Products.Add(id, prod);
        }
        return prod;
      }
      // </editor-fold>
      else {
        return this.cache.Products.Item(id);
      }

    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getQuotationById(quotationId: number): Promise<Quotation> {
    try {
      const response = await this.http.get(quotationsUrl + `/${quotationId}`).toPromise();

      const data = response.json();
      if (response.status !== 200) {
        throw new Error('server side status error');
      }
      let quotation: Quotation = null;
      if (data != null) {
        quotation = new Quotation(data.id, data.idSupplier, data.dateStart, data.dateEnd, data.currencyId);
      }
      return quotation;

    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getSupplierById(supplierId: number): Promise<Supplier> {
    try {
      const suppl: Supplier = new Supplier();
      const id: string = supplierId.toString();

      // <editor-fold desc = "id in cache is empty"
      if (this.isEmpty(this.cache.Suppliers.Item(id))) {
        this.cache.Suppliers.Add(id, suppl);

        const response = await this.http.get(suppliersUrl + `/${id}`).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error('server side status error');
        }

        if (data != null) {
          suppl.id = data.id;
          suppl.name = data.name;
          suppl.paymentMethodId = data.paymentMethodId;
          suppl.rating = data.rating;
          this.cache.Suppliers.Add(id, suppl);
        }
        return suppl;
      }
      // </editor-fold>

      else {
        return this.cache.Suppliers.Item(id);
      }

    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getCurrencyById(currencyId: number): Promise<Currency> {
    try {
      const curr: Currency = new Currency();
      const id: string = currencyId.toString();

      // <editor-fold desc = "id in cache is empty"
      if (this.isEmpty(this.cache.Currency.Item(id))) {
        this.cache.Currency.Add(id, curr);
        const response = await this.http.get(currenciesUrl + `/${id}`).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error('server side status error');
        }

        if (data != null) {
          curr.id = data.id;
          curr.shortName = data.shortName;
          this.cache.Currency.Add(id, curr);
        }
        return curr;
      }
      // </editor-fold>

      else {
        return this.cache.Currency.Item(id);
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getSuppliers(cacheForce: boolean): Promise<Supplier[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.cache.Suppliers.Count() === 0 || cacheForce === true) {
        const response = await this.http.get(suppliersUrl).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error('server side status error');
        }
        const suppliers = new Array<Supplier>();
        if (data != null) {
          data.forEach((val) => {
            // create current supplier
            const supplierItem: Supplier = new Supplier(val.id, val.name, val.paymentMethodId, val.rating);

            suppliers.push(supplierItem);

            // add supplier to cashe
            this.cache.Suppliers.Add(supplierItem.id.toString(), supplierItem);
          });
        }
        return suppliers;
      }
      // </editor-fold>
      else {
        return this.cache.Suppliers.Values();
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getCurrencies(cacheForce: boolean): Promise<Currency[]> {
    try {
      // <editor-fold desc = "cashe is empty or cache force active">
      if (this.cache.Currency.Count() === 0 || cacheForce === true) {
        const response = await this.http.get(currenciesUrl).toPromise();

        const data = response.json();
        if (response.status !== 200) {
          throw new Error('server side status error');
        }
        const currencies = new Array<Currency>();
        if (data != null) {
          data.forEach((val) => {
            // create current currency
            const currencyItem: Currency = new Currency(val.id, val.shortName);
            currencies.push(currencyItem);

            // add currency to cashe
            this.cache.Currency.Add(currencyItem.id.toString(), currencyItem);
          });
        }
        return currencies;
      }
      // </editor-fold>
      else {
        return this.cache.Currency.Values();
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  // <editor-fold desc="error handler"
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.messages || error);
  }

  // </editor-fold>
  // <editor-fold desc="url search factory">
  private createSearchParams(params: Array<{ key: string, value: string }>): URLSearchParams {
    const searchParams = new URLSearchParams();
    params.forEach((val) => {
      searchParams.set(val.key, val.value);
    });

    return searchParams;
  }

  // </editor-fold>
  // <editor-fold desc="get product prop value from product"
  private getPropValuefromProduct(product: any): Array<ProductPropValue> {
    const props = new Array<ProductPropValue>();
    product.props.forEach((val) => {
      let enumVal = (val.prop_Value_Enum !== null)
        ? new PropEnumList(val.prop_Value_Enum.id, this.getSingleProp(val.prop_Value_Enum.id_Prop),
          val.prop_Value_Enum.name, val.prop_Value_Enum.list_Index, val.prop_Value_Enum.bit_Index,
          val.prop_Value_Enum.url
        ) : null;

      props.push(
        new ProductPropValue(val.id, val.id_Product, this.getSingleProp(val.id_Prop), val.prop_Value_Str,
          val.prop_Value_Number, val.prop_Value_Bool, enumVal, val.prop_Value_Long));
    });

    return props;
  }

  // </editor-fold>
  // <editor-fold desc="get single prop from parent container"
  private getSingleProp(val: any): Prop {
    return new Prop(val.id, val.name, val.prop_type, val.is_Multi_Select, val.url, val.predestination);
  }

  // </editor-fold>
  // <editor-fold desc="inspect cache predicate"
  private isEmpty<T>(value: T) {
    return (value === undefined);
  }

  // </editor-fold>
}
