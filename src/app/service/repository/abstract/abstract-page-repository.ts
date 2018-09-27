export abstract class AbstractPageRepository {
  public async abstract getPageContent(id:number):Promise<string>;
  public async abstract getPageOptionsById(id:number):Promise<any>;
}
