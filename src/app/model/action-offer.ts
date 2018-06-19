import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';
//import {RefInjector} from '../core/app-core';

export class ActionOffer {
  //public _repo: AbstractDataRepository;
  constructor(public id?: number,
              public idAction?: number,
              public idQuotation?: number,
              public idCur?: number) {
    //this._repo = RefInjector.pull(AbstractDataRepository);
  }
}
