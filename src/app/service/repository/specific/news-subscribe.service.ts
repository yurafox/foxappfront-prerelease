import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AppConstants} from '../../../app-constants';
import {AbstractNewsSubscribeService} from '../abstract/abstract-news-subscribe-service';

@Injectable()
export class NewsSubscribeService extends AbstractNewsSubscribeService {

  constructor(public http: HttpClient) {
    super();
  }

  subscribeToNews(email: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(AppConstants.EMAIL_SUBSCRIPTION_ENDPOINT, email, {headers:headers});
  }

}
