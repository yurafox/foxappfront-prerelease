import {NewsCategory} from '../../../model/news-category';

export abstract class AbstractNewsCategoryRepository {
  public async abstract getNewsCategory(): Promise<NewsCategory[]>;
}
