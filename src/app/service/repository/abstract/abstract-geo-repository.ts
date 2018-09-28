import {Country} from '../../../model/country';
import {City} from '../../../model/city';
import {Region} from '../../../model/region';

export abstract class AbstractGeoRepository {
  public async abstract loadCityCache();
  public async abstract getCityById(id: number): Promise<City>;
  public async abstract getCities(): Promise<City[]>;
  public async abstract searchCities(srchString: string): Promise<City[]>;
  public async abstract loadRegionsCache();
  public async abstract getRegionById(id: number): Promise<Region>;
  public async abstract getRegions(): Promise<Region[]>;
  public async abstract getCitiesWithStores(): Promise<City[]>;
  public async abstract getCountryById(id: number): Promise<Country>;
  public async abstract getCountries(): Promise<Country[]>;
}
