import {Manufacturer} from '../../../model/manufacturer';

export abstract class AbstractManufacturerRepository {
  public async abstract getManufacturerById(manufacturerId: number): Promise<Manufacturer>;
  public async abstract getManufacturers(cacheForce: boolean): Promise<Manufacturer[]>;
}
