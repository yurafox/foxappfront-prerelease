import {AbstractDataRepository} from '../service/index';
//import {RefInjector} from '../core/app-core';

export class ActionOffer {
  //private _repo: AbstractDataRepository;
  constructor(public id?: number,
              public idAction?: number,
              public idQuotation?: number,
              public idCur?: number) {
    //this._repo = RefInjector.pull(AbstractDataRepository);
  }
}
