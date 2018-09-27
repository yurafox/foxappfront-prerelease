import {IDictionary} from '../../../core/app-core';
import {Store} from '../../../model/store';

export abstract class AbstractStoreRepository {
  public async abstract getStores(): Promise<IDictionary<Store[]>>;
  public async abstract getStoreById(id: number): Promise<Store>;
  public async abstract getFavoriteStores(): Promise<Store[]>;
  public async abstract addFavoriteStore(idStore: number): Promise<number>;
  public async abstract deleteFavoriteStore(idStore: number): Promise<number>;
}
