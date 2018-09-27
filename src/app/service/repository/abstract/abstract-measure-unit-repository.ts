import {MeasureUnit} from '../../../model/measure-unit';

export abstract class AbstractMeasureUnitRepository {
  public async abstract loadMeasureUnitCache();
  public async abstract getMeasureUnitById(unitId: number): Promise<MeasureUnit>;
}
