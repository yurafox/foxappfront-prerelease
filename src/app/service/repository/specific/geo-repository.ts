import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {retry} from "rxjs/operators";
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import CacheProvider = Providers.CacheProvider;
import { Providers } from '../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { Region } from '../../../model/region';
import { Country } from '../../../model/country';
import { City } from '../../../model/city';
import {AbstractGeoRepository} from "../abstract/abstract-geo-repository";
import {AppDataRepository} from "./app-data-repository";

// <editor-fold desc="url const">
const countriesUrl = `${AppConstants.BASE_URL}/geo/country`;
const citiesUrl = `${AppConstants.BASE_URL}/geo/city`;
const citiesWithStoresUrl = `${AppConstants.BASE_URL}/geo/citiesWithStores`;
const regionsUrl = `${AppConstants.BASE_URL}/geo/region`;
// </editor-fold

@Injectable()
export class GeoRepository extends AbstractGeoRepository {
  constructor(public http: HttpClient, public connServ: ConnectivityService,
              public dataRepo: AppDataRepository) {
    super();
  }

  public async getCitiesWithStores(): Promise<City[]> {
    try {
      if (this.dataRepo.cache.CityWithStore.HasNotValidCachedRange()) {
        const response: any = await this.http.get(citiesWithStoresUrl, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

        const data = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        const cities = new Array<City>();
        if (data != null) {
          if (data) data.forEach(val => {
            // create current city
            const cityItem: City = new City(val.id, val.name, val.idRegion);
            cities.push(cityItem);
            if (CacheProvider.Settings) this.dataRepo.cache.CityWithStore.Add(val.id.toString(), { item: cityItem, expire: Date.now() + CacheProvider.Settings.city.expire });
          });
        }
        return cities;
      } else {
        return this.dataRepo.cache.CityWithStore.Values();
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async searchCities(srchString: string): Promise<City[]> {
    try {
      const response: any = await this.http.get(citiesUrl, RequestFactory.makeSearch([
        { key: "srch", value: srchString }
      ])).pipe(retry(3)).toPromise();

      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const cities = new Array<City>();
      if (data != null) {
        if (data) data.forEach(val => {
          // create current city
          const cityItem: City = new City(val.id, val.name, val.idRegion);
          cities.push(cityItem);
        });
      }
      return cities;
    } catch (err) {
      await this.handleError(err);
    }

  }

  public async getCities(): Promise<City[]> {
    try {
      if (this.dataRepo.cache.City.HasNotValidCachedRange()) {
        const response: any = await this.http.get(citiesUrl, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

        const data = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        const cities = new Array<City>();
        if (data != null) {
          if (data) data.forEach(val => {
            // create current city
            const cityItem: City = new City(val.id, val.name, val.idRegion);
            cities.push(cityItem);
            if (CacheProvider.Settings) this.dataRepo.cache.City.Add(val.id.toString(), { item: cityItem, expire: Date.now() + CacheProvider.Settings.city.expire });
          });
        }
        return cities;
      } else {
        return this.dataRepo.cache.City.Values();
      }
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getCityById(id: number): Promise<City> {
    if (!id) return null;
    try {
      const _id: string = id.toString();
      if (this.dataRepo.cache.City.HasNotValidCachedValue(_id)) {
        const entity: Providers.CacheDataContainer<City> = this.dataRepo.cache.City.Item(_id);
        const city: City = (entity) ? entity.item : new City();

        if (!entity) {
          if (CacheProvider.Settings) this.dataRepo.cache.City.Add(_id, { item: city, expire: Date.now() + CacheProvider.Settings.city.expire });
        }

        else
        if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.city.expire;
        // http request
        const response: any = await this.http.get(citiesUrl + `/${_id}`, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

        // response data binding
        let data: any = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data) {
          city.id = id;
          city.name = data.name;
          city.idRegion = data.idRegion;

          return city;
        }
        return this.dataRepo.cache.City.Remove(_id).item;
      } else {
        // </editor-fold>
        return this.dataRepo.cache.City.Item(_id).item;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getRegionById(id: number): Promise<Region> {
    if (!id) return null;
    try {
      const _id: string = id.toString();
      //let city = null;
      if (this.dataRepo.cache.Region.HasNotValidCachedValue(_id)) {
        const entity: Providers.CacheDataContainer<Region> = this.dataRepo.cache.Region.Item(_id);
        const region: Region = (entity) ? entity.item : new Region();

        if (!entity) {
          if (CacheProvider.Settings) this.dataRepo.cache.Region.Add(_id, { item: region, expire: Date.now() + CacheProvider.Settings.region.expire });
        }

        else
        if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.region.expire;

        // http request
        const response: any = await this.http.get(regionsUrl + `/${_id}`, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

        // response data binding
        let data: any = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data) {
          region.id = id;
          region.name = data.name;
          return region;
        }
        return this.dataRepo.cache.Region.Remove(_id).item;
      } else {
        // </editor-fold>
        return this.dataRepo.cache.Region.Item(_id).item;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getRegions(): Promise<Region[]> {
    try {
      const response: any = await this.http.get(regionsUrl, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      const regions = new Array<Region>();
      if (data != null) {
        if (data) data.forEach(val => {
          const regionItem: Region = new Region(val.id, val.name);
          regions.push(regionItem);
        });
      }
      return regions;
    } catch (err) {
      await this.handleError(err);
    }
  }

  public async getCountries(): Promise<Country[]> {
    try {
      if (this.dataRepo.cache.Country.HasNotValidCachedRange()) {
        const response: any = await this.http.get(countriesUrl, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

        const data = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        const cCountries = new Array<Country>();
        if (data != null) {
          if (data) data.forEach(val => {
            let p = new Country();
            p.id = val.id;
            p.name = val.name;
            cCountries.push(p);
            if (CacheProvider.Settings) this.dataRepo.cache.Country.Add(p.id.toString(), { item: p, expire: Date.now() + CacheProvider.Settings.country.expire });
          });

          return cCountries;
        }
      } else {
        return this.dataRepo.cache.Country.Values();
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async getCountryById(id: number): Promise<Country> {
    if (!id) return null;
    try {
      const _id = id.toString();
      if (this.dataRepo.cache.Country.HasNotValidCachedValue(_id)) {
        const entity: Providers.CacheDataContainer<Country> = this.dataRepo.cache.Country.Item(_id);
        const country: Country = (entity) ? entity.item : new Country();

        if (!entity) {
          if (CacheProvider.Settings) this.dataRepo.cache.Country.Add(_id, { item: country, expire: Date.now() + CacheProvider.Settings.country.expire });
        }

        else
        if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.country.expire;

        const response: any = await this.http
          .get(countriesUrl + `/${_id}`, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();
        let data: any = response.body;

        if (response.status !== 200) {
          throw new Error("server side status error");
        }

        if (data) {
          country.id = data.id;
          country.name = data.name;
          return country;
        }

        return this.dataRepo.cache.Country.Remove(_id).item;
      }
      else {
        return this.dataRepo.cache.Country.Item(_id).item;
      }
    } catch (err) {
      return await this.handleError(err);
    }
  }

  public async loadCityCache() {
    try {
      const response: any = await this.http
        .get(citiesWithStoresUrl, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

      let data: any = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        if (data) data.forEach(val => {
            if (this.dataRepo.cache.City.HasNotValidCachedValue(val.id.toString())) {
              const entity: Providers.CacheDataContainer<City> = this.dataRepo.cache.City.Item(val.id.toString());
              const city: City = (entity) ? entity.item : new City();

              if (!entity) {
                if (CacheProvider.Settings) this.dataRepo.cache.City.Add(val.id.toString(), { item: city, expire: Date.now() + CacheProvider.Settings.city.expire });
              }

              else
              if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.city.expire;

              city.id = val.id;
              city.name = val.name;
              city.idRegion = val.idRegion;
            }
          }
        );
      }
    }
    catch (err) {
      return await this.handleError(err);
    }
  }

  public async loadRegionsCache() {
    try {
      const response: any = await this.http
        .get(regionsUrl, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();

      let data: any = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }

      if (data != null) {
        if (data) data.forEach(val => {
            if (this.dataRepo.cache.Region.HasNotValidCachedValue(val.id.toString())) {
              const entity: Providers.CacheDataContainer<Region> = this.dataRepo.cache.Region.Item(val.id.toString());
              const region: Region = (entity) ? entity.item : new Region();

              if (!entity) {
                if (CacheProvider.Settings) this.dataRepo.cache.Region.Add(val.id.toString(), { item: region, expire: Date.now() + CacheProvider.Settings.region.expire });
              }

              else
              if (CacheProvider.Settings) entity.expire = Date.now() + CacheProvider.Settings.region.expire;

              region.id = val.id;
              region.name = val.name;
            }
          }
        );
      }
    }
    catch (err) {
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

  // <editor-fold desc="inspect cache predicate"
  public isEmpty<T>(value: T) {
    return value === undefined;
  }
  // </editor-fold>

}
