import {EventEmitter, Injectable} from '@angular/core';
import {IDictionary} from '../core/app-core';

@Injectable()
export class EventService {
  public events: IDictionary<EventEmitter<any>>;
  constructor() {
     this.events = {
       'localeChangeEvent': new EventEmitter<any>(),
       'logonEvent': new EventEmitter<any>(),
       'logOffEvent': new EventEmitter<any>()
     };
  }
}
