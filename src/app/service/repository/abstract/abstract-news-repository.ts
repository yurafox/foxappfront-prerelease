import {News} from '../../../model/news';

export abstract class AbstractNewsRepository {
  public async abstract getNewsByCategory(categoryId: number): Promise<News[]>;
  public async abstract getNewsDescription(id: number): Promise<string>;
}
