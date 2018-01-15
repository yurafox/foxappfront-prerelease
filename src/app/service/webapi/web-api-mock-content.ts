import { IDictionary } from "../../core/app-core";

//#region PAGEHOME
const PAGEHOME:string = `<ion-slides pager autoplay="2000">
<ion-slide *ngFor="let slide of slides">
  <img src="{{ slide.src }}" alt="">
</ion-slide>

</ion-slides>
<!--list categories-->
<ion-card>
<ion-list class="cat-list">
  <ion-row>
    <ion-col text-center (click)="viewCategories()">
      <img src="assets/icon/allcategories.svg" alt="" height="50px">
      <div text-center>Все категории</div>
    </ion-col>
  </ion-row>
</ion-list>
</ion-card>
<!--actions list-->
<h2 style="text-align: center">Акции</h2>
<ion-card>
  <action-sketch [innerId]=1></action-sketch>
  <hr style='height: 5px'>
  <action-sketch [innerId]=2></action-sketch>
</ion-card>`
//#endregion
//#region ACTION
  const ACTION = `<div style="text-align: center">
  <div style="width: 214px;margin:0px auto">
   <img style="margin-top:10px;width: auto;max-width: 100%;height: auto;max-height: 100%" src='{{img_url}}.jpg'>
   <div style="margin-top:10px"><span style="font-size: 20px;color:dimgrey">{{name}}</span></div>
   <div style="margin-top:10px;margin-bottom:10px"><span style="font-size: 14px"><b>Осталось <font size='5'>{{actionActiveRange}}</font> дн.</b></span></div>
  </div>
</div>`;
//#endregion
//#region PARTSPAY
const PARTSPAY = `<h3 style='text-align: center'>{{name}}</h3>
<div class='default-container'>
  <span>{{actionActiveLine}}</span>
  <div class='default-timeViewer'>
     <div style='width: 20%;margin-left:8%'>до конца<br/>акции</div>
     <div><b>{{expire?.getDate()}}</b><br/>дни</div>
     <div><b>{{expire?.getHours()}}</b><br/>часы</div>
     <div><b>{{expire?.getMinutes()}}</b><br/>мин.</div>
     <div><b>{{expire?.getSeconds()}}</b><br/>сек.</div>
  </div>
  <div class="default-image-section">
     <img src="{{img_url}}_long.jpg" alt=''>
  </div>
  <div class="default-action-product-header">
    <h3>Акционные товары:</h3>
  </div>
   <div *ngFor='let item of quotationProduct'>
     <div *ngIf="item?.product?.id">
        <item [product]="item?.product"></item>
        <hr/>
     </div>
   </div>
</div>`;
//#endregion
//#region ROUTERGIFT
const ROUTERGIFT = `<h3 style='text-align: center'>{{name}}</h3>
<div class='default-container'>
  <span>{{actionActiveLine}}</span>
  <div class='default-timeViewer'>
     <div style='width: 20%;margin-left:8%'>до конца<br/>акции</div>
     <div><b>{{expire?.getDate()}}</b><br/>дни</div>
     <div><b>{{expire?.getHours()}}</b><br/>часы</div>
     <div><b>{{expire?.getMinutes()}}</b><br/>мин.</div>
     <div><b>{{expire?.getSeconds()}}</b><br/>сек.</div>
  </div>
  <div class="default-image-section">
     <img src="{{img_url}}_long.jpg" alt=''>
  </div>
  <div class="default-action-product-header">
    <h3>Акционные товары:</h3>
  </div>
  <div *ngFor='let item of quotationProduct'>
    <div *ngIf="item?.product?.id">
       <item [product]="item?.product"></item>
       <hr/>
    </div>
  </div>
</div>`;
//#endregion
export class WebApiMockContent {
   public dynamicContent:IDictionary<string>={
     'HOME': PAGEHOME,
     'ACTION': ACTION,
     'PARTSPAY':PARTSPAY,
     'ROUTERGIFT':ROUTERGIFT
   };
}
