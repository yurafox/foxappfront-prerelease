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
   <img style="margin-top:10px;width: auto;max-width: 100%;height: auto;max-height: 100%" src="{{img_url}}">
   <div style="margin-top:10px"><span style="font-size: 20px;color:dimgrey">{{name}}</span></div>
   <div style="margin-top:10px;margin-bottom:10px"><span style="font-size: 14px"><b>Осталось <font size='5'>{{actionActiveRange}}</font> дн.</b></span></div>
  </div>
</div>`;
//#endregion
//#region PARTSPAY
const PARTSPAY = `<h1 style="text-align: center">Оплата частями</h1>
<ion-card>
  <div style="display: block;font-size: 17px;padding: 10px 20px;margin-top: 20px;background: white">
    *Мається на увазі придбання товарів в кредит за програмою «Оплата частинами», що пропонується
    ПАТ КБ "Приватбанк" (ліцензія НБУ №22 від 05.10.2011р.). Послуга «Оплата частинами» доступна
    володільцям карток «Універсальна», «Універсальна Gold» та володільцям елітних карток для VIP-
    клієнтів від банку «Приват Банк» (ліцензія НБУ №22 від 05.10.2011р.). Деталі запитуйте у
    представників банку, які знаходяться у магазинах ТМ «Фокстрот». Інформація про кредит надається на правах реклами.
  </div>
</ion-card>`;
//#endregion
//#region ROUTERGIFT
const ROUTERGIFT = `<h1 style="text-align: center">Роутер в подарок</h1>
<ion-card>
  <div style="display: block;font-size: 17px;padding: 10px 20px;margin-top: 20px;background: white">
  <b>АКЦІЯ ДІЄ З 8 ЛИСТОПАДА ПО 31 ГРУДНЯ 2017 РОКУ ВКЛЮЧНО В ІНТЕРНЕТ-МАГАЗИНІ WWW.FOXTROT.UA. ТА НЕ ДІЄ В РОЗДРІБНИХ МАГАЗИНАХ ТМ «ФОКСТРОТ».</b>

  Під словом «Подарунок» мається на увазі надання покупцю при придбанні в період дії акції
  в інтернет-магазині www.foxtrot.ua акційного товару права придбати подарунковий Роутер NETIS WF2419E 300Mbps
  IPTV Wireless N Router (вартість - 399грн. з ПДВ) та одночасно отримати знижку у розмірі вартості подарункового
  Роутеру NETIS WF2419E 300Mbps IPTV Wireless N Router на сумарну вартість покупки подарункового Роутера NETIS WF2419E 300Mbps
  IPTV Wireless N Router та обраного акційного товару, що беруть участь в цій акції одночасно (одним чеком)
  єдиним рекламним набором (комплектом). Сума знижки може розподілятися на товари у чеку згідно облікової політики продавця.
  Обмін товарів та розірвання договору купівлі-продажу якісних товарів протягом 14 днів здійснюється у випадку повернення
  всього рекламного набору (комплекту). Окрема вартість кожного акційного товару зазначається в інтернет-магазині www.foxtrot.ua
  біля такого товару. Перелік акційних товарів та подарунків обмежений. Пропозиція не діє у разі придбання акційних
  товарів в кредит за кредитними програмами банків-партнерів. У випадку, якщо акційний товар за цією акцією, приймає участь
  в іншій акції, або на нього встановлено окрему знижку, то покупець повинен обрати, на яких умовах він придбає цей товар.
  Організатор акції залишає за собою право змінювати умови акції. Про умови та перелік товарів, що беруть участь в акції,
  дізнавайтеся на сайті www.foxtrot.ua або за телефоном 0 800 300 353 (дзвінки безкоштовні в межах України з номерівукраїнських операторів).
  </div>
</ion-card>`;
//#endregion
export class WebApiMockContent {
   public dynamicContent:IDictionary<string>={
     'HOME': PAGEHOME,
     'ACTION': ACTION,
     'PARTSPAY':PARTSPAY,
     'ROUTERGIFT':ROUTERGIFT
   };
}
