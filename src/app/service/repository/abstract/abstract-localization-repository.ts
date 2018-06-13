import {IDictionary} from '../../../core/app-core';

export abstract class AbstractLocalizationRepository {
  public abstract async getLocalization(data: {componentName: string, lang: number}): Promise<IDictionary<string>>;
  public abstract async setLocalization();
  public abstract getLocString(): string;
  protected constructor(){}
}
