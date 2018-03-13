export class Action {
  constructor(public id?: number,
              public name?: string,
              public dateStart?:Date,
              public dateEnd?:Date,
              public img_url?:string,
              public priority?:number,
              public sketch_content?:string,
              public action_content?:string,
              public isActive:boolean=false,
              ) {
  }
}
