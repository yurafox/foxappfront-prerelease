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
<!--novelty-->
<h2 style="text-align: center">Новинка!</h2>
<ion-card>
  <novelty-sketch [innerId]=1></novelty-sketch>
</ion-card>
 <poll-banner [innerId]=1></poll-banner>
<!--actions list-->
<h2 style="text-align: center">Акции</h2>
<ion-card>
  <action-sketch [innerId]=1></action-sketch>
  <hr style='height: 5px'>
  <action-sketch [innerId]=2></action-sketch>
</ion-card>
<poll-banner [innerId]=2></poll-banner>`

//#endregion
//#region NOVELTY
const NOVELTY = `<div style="text-align: center">
  <div style="width: 214px;margin:0px auto">
   <img style="margin-top:10px;width: auto;max-width: 100%;height: auto;max-height: 100%" src='{{img_url}}.jpg'>
   <div style="margin-top:10px"><span style="font-size: 20px;color:dimgrey">{{name}}</span></div>
   <div style="margin-top:10px;margin-bottom:10px"><span style="font-size: 14px"><b>Новинка в нашем магазине!</b></span></div>
  </div>
</div>`;
//#endregion
//#region WILEYFOXSPARK
const WILEYFOXSPARK = `<h3 style='text-align: center'>{{name}}</h3>
<div>
    <img src="{{img_url}}1.jpg">
    <span class="default-container">Новинка Wileyfox Spark поставляется с предустановленной Cyanogen OS. Вас также порадует качественная сборка и материалы корпуса. Достаточный запас производительности и приемлемая автономность сделают «Искру» хорошим помощником для выполнения повседневных задач.</span>
    <img src="{{img_url}}2.jpg">
    <img src="{{img_url}}3.jpg">
    <span class="default-container">Тончайший корпус шириной всего 6,5 мм выполнен в двух цветовых вариантах: черном Sand Stone и белом Silk Touch. Пользоваться смартфоном легко и удобно благодаря небольшому весу (136 г) и шероховатому, приятному на ощупь Soft-touch-материалу съемной задней крышки.</span><br>
    <span class="default-container">Фактурный фирменный логотип в форме мордочки лисы из анодированного цинка уже стал приметной чертой Wileyfox. Этот элемент выделит устройство из серой массы одинаковых телефонов. Заканчивает концепцию яркого дизайна изогнутый 2.5D-дисплей.</span>
    <img src="{{img_url}}4.jpg">
    <span class="default-container">Великолепный 5-дюймовый экран создан по технологии ONCELL – полное ламинирование, устраняющее воздушную прослойку между тачскрином и экранным модулем и помогающее избежать преломление света.</span>
    <img src="{{img_url}}5.jpg">
    <span class="default-container">Благодаря этому IPS-матрица с разрешением 1280 x 720 (294 ppi) обладает максимальными углами обзора до 178° и прекрасной цветопередачей. Дисплей покрывает изготовленное в Японии защитное стекло Dragontrail с олеофобным слоем.
    </span>
    <img src="{{img_url}}6.jpg">
    <span class="default-container">Wileyfox Spark поддерживает одновременную работу в 2G-, 3G- и 4G-сетях, обеспечивая доступ в интернет со скоростью до 150 Мб/с и превосходную связь. Теперь не нужно переключаться – оба слота под SIM-карты поддерживают новейшие стандарты связи. Эффективная работа приложений, быстрое переключение между открытыми окнами и никаких зависаний – все это возможно благодаря процессору MediaTek МТ6735А quad-core с частотой 1.3 ГГц и 1 Гб оперативной памяти. 8 Гб встроенной flash-памяти можно расширить до 64 Гб с помощью карт microSDHC. В смартфоне установлены системы GPS и A-GPS.</span>
    <img src="{{img_url}}7.jpg">
    <span class="default-container">Впервые Cyanogen OS поддерживается в смартфоне, построенном на базе чипсета MediaTek. Это позволило создать производительную базу для современного программного обеспечения, сохранив доступную стоимость смартфона. Cyanogen 13.0 на базе ОС Android 6.0 Marshmallow предоставляет расширенные возможности управления, кастомизации и безопасности, не доступные в стандартной версии операционной системы Android.</span>
    <img src="{{img_url}}8.jpg">
    <img src="{{img_url}}9.jpg">
    <span class="default-container">Wileyfox Spark оснащен камерой с 8-мегапиксельной матрицей, 5-линзовым объективом с диафрагмой f/2.2 и BSI-сенсором, что в совокупности обеспечивают высокую светочувствительность. В штатном режиме HDR одновременно делаются три снимка с разной экспозицией и совмещаются в один кадр. Таким образом достигается высокая контрастность и сохраняются важные детали в темных и светлых областях фотографии.</span><br>
    <span class="default-container">Фронтальная 8-мегапиксельная камера с широкоугольным объективом и диафрагмой f/2.4 делает отличные селфи-снимки.</span>
    <img src="{{img_url}}10.jpg">
    <span class="default-container">Съемный аккумулятор на 2200 мАч гарантирует работу смартфона до 352 часов в режиме ожидания и 12 часов в режиме разговора.</span>
  <br><span style="text-align: center; display: block;"><button ion-button (click)="addToCart()"
              style="background: #ef4123; color: #ffffff; text-transform: none; font-size: 20px; font-weight: 400;
              padding: 20px; margin: 10px 20px 20px 20px;">
              Купить сейчас
      </button></span>
</div>`;
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
     'NOVELTY': NOVELTY,
     'WILEYFOXSPARK': WILEYFOXSPARK,
     'ACTION': ACTION,
     'PARTSPAY':PARTSPAY,
     'ROUTERGIFT':ROUTERGIFT
   };
}
