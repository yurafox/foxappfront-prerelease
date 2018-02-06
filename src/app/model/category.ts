export class Category {
    constructor(public id?: number,
                public name?: string,
                public parentId?:number,
                public idProductCat?:number,
                public prefix?:string,
                public icon?:string,
                public isShow?:boolean,
                public priorityIndex?:number,
                public priorityShow?:number
                ) {
    }
  }
  