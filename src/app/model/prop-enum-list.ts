import { Prop} from './prop';

export class PropEnumList {
  constructor(
    public id: number,
    public id_Prop: Prop,
    public name: string,
    public list_Index?: number,
    public bit_Index?: number,
    public url?: string
  ) {}
}
