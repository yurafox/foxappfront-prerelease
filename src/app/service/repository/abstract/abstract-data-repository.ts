import {Providers} from '../../../core/app-core';
import {AppParam} from '../../../model/app-param';
import IKeyedCollection = Providers.IKeyedCollection;
import {Lang} from '../../../model/lang';

export abstract class AbstractDataRepository {
  public async abstract getLocale(cacheForce: boolean): Promise<Lang[]>;
  public async abstract getAppParams():  Promise<IKeyedCollection<Providers.CacheDataContainer<AppParam>>>;
  public async abstract getAppParam(param: string): Promise<string>;
}
