export class Category {
    constructor(public id?: number,
                public name?: string,
                public parent_id?:number,
                public id_product_cat?:number,
                public prefix?:string,
                public icon?:string,
                public is_show?:boolean,
                public priority_index?:number,
                public priority_show?:number
                ) {
    }
  }
  