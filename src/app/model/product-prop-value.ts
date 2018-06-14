import {MeasureUnit} from './measure-unit';
import {LazyLoad, RefInjector} from '../core/app-core';
import {AbstractDataRepository} from '../service/repository/abstract/abstract-data-repository';
import {Prop} from './prop';
import {PropEnumList} from './prop-enum-list';

@LazyLoad([
  { options:{constructor: MeasureUnit}, action: 'getMeasureUnitById', params: ['id_Measure_Unit']}
])
export class ProductPropValue {

  private _repo: AbstractDataRepository;

  constructor (
    public id: number,
    public id_Product: number,
    public id_Prop: Prop,
    public prop_Value_Str?: string,
    public prop_Value_Number?: number,
    public prop_Value_Bool?: boolean,
    public prop_Value_Enum?: PropEnumList,
    public prop_Value_Long?: string,
    public pVal?: string,
    public id_Measure_Unit?: number,
    public idx?: number,
    public out_bmask?: number
  )
  {
    this._repo = RefInjector.pull(AbstractDataRepository);
  }

  /*
  public get value(): any {
    if (this.id_Prop.prop_type == 1 ) {
      return this.prop_Value_Str;
    };

    if (this.id_Prop.prop_type == 2 ) {
      return this.prop_Value_Number;
    };

    if (this.id_Prop.prop_type == 3 ) {
      return this.prop_Value_Bool;
    };

    if (this.id_Prop.prop_type == 4 ) {
      return (this.prop_Value_Enum) ? this.prop_Value_Enum.name : null;
    };
  }
  */
}
