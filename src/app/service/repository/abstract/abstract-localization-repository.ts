import {IDictionary} from '../../../core/app-core';

export abstract class AbstractLocalizationRepository {
  public abstract getLocalization(data: {componentName: string, lang: number}): Promise<IDictionary<string>>;
  protected constructor(){}
}
