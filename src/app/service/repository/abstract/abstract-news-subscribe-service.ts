import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

export abstract class AbstractNewsSubscribeService {
  public abstract subscribeToNews(email: string): Observable<Response>;

}
