import { Injectable } from '@angular/core';
import {Http, Response, ResponseOptions, ResponseType, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {AbstractNewsSubscribeService} from '../abstract/abstract-news-subscribe-service';

@Injectable()
export class MockNewsSubscribeService extends AbstractNewsSubscribeService {

  constructor() {
    super();
  }

  subscribeToNews(email: string): Observable<Response> {
    console.log('MockNewsSubscribeService');

    if (email['SEmail'] == 'yura@foxtrot.com.ua') {
      let options = new ResponseOptions({
        status: 200,
        body: '{"msg":"Blah-Blah", "status":"1"}'
      });
      return Observable.of(new Response(options)).delay(500);
    }
    else if (email['SEmail'] == 'roleg@foxtrot.com.ua') {
      let options = new ResponseOptions({
        status: 200,
        body: '{"msg":"Email duplicated", "status":"0"}'
      });
      return Observable.of(new Response(options)).delay(1000);
    }
    else if (email['SEmail'] == 'error@foxtrot.com.ua') {
      let options = new ResponseOptions({
        type: ResponseType.Error,
        status: 500,
        body: '{"status":"500", "msg":"InternalServerError"}'
      });
      return  Observable.of(new Response (options) as Response & Error).delay(5000);
    } else return new Observable(subscriber => {subscriber.error('Observable Error')});
  }

}
