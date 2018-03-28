import {IDictionary} from '../../../core/app-core';

export abstract class AbstractLocalizationRepository {
  public abstract getLocalization(data: {componentName: string, lang: number}): IDictionary<string>;
  public abstract async setLocalization();
  protected constructor(){}
}
