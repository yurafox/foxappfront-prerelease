export class Prop {
  constructor (
    public id: number,
    public name: string,
    public prop_type: number,
    public is_Multi_Select?: boolean,
    public url?: string
  ){}
}
