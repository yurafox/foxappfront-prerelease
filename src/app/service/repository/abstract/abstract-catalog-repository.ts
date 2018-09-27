import {Category} from '../../../model/category';

export abstract class AbstractCatalogRepository {
  public async abstract getCategories(): Promise<Category[]>;
}
