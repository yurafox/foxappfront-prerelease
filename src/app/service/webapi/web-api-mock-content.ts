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
      <ion-col text-center style="padding:10px 10px;" (click)="viewCategories()">
        <img src="assets/icon/allcategories.svg" alt="" height="50px">
        <div text-center style="font-size:15px;">Все категории</div>
      </ion-col>
    </ion-row>
  </ion-list>
</ion-card>
<!--novelty 1-->
<ion-card>
  <novelty-sketch [innerId]=1></novelty-sketch>
</ion-card>
<!--poll 1-->
 <poll-banner [innerId]=1></poll-banner>
<!--actions 1-->
<ion-card>
  <action-sketch [innerId]=1></action-sketch>
</ion-card>
<!--novelty 2-->
<ion-card>
  <novelty-sketch [innerId]=2></novelty-sketch>
</ion-card>
<!--actions 2-->
<ion-card>
  <action-sketch [innerId]=2></action-sketch>
</ion-card>
<!--poll 2-->
<poll-banner [innerId]=2></poll-banner>`;

//#endregion
//#region NOVELTY
const NOVELTY = `<div style="padding: 20px 20px;">
  <span style="font-size:18px;"><b>Новинка</b></span>
  <div style="width:250px;margin:0px auto;padding:10px;text-align: center;">
    <img style="margin-top:10px;width: auto;max-width: 100%;height: auto;max-height: 100%" src='{{img_url}}.jpg'>
  </div>
  <div>
    <span style="font-size:15px;"><b>{{name}}</b></span><br>
    <span style="font-size:14px;color:dimgray;">{{product?.price | localeCurrency:userService.currency}}</span>
  </div>
</div>
`;
//#endregion
//#region WILEYFOXSPARK
const WILEYFOXSPARK = `<h3 class="f-novelty-h3">{{name}}</h3>
<div>
    <img src="{{img_url}}1.jpg">
    <span class="default-container">Новинка Wileyfox Spark поставляется с предустановленной Cyanogen OS. Вас также порадует качественная сборка и материалы корпуса. Достаточный запас производительности и приемлемая автономность сделают «Искру» хорошим помощником для выполнения повседневных задач.</span>
    <img src="{{img_url}}2-3.jpg">
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
    <img src="{{img_url}}8-9.jpg">
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
//#region SAMSUNGGS8
const SAMSUNGGS8 = `<h3 class="f-novelty-h3">{{name}}</h3>
<div>
    <span class="default-container" style="font-size:19px; font-weight: bold;">Смартфон без границ</span><br>
    <img src="{{img_url}}-1.jpg">
    <span class="default-container">Смартфон от компании SAMSUNG выполнен в стильной черной расцветке. Смартфон симметрично скруглен со всех сторон, что придает ему привлекательный внешний вид. Рамка его корпуса изготовлена из высококачественного алюминия, а задняя панель из прочного стекла Corning Gorilla Glass 5. Это позволяет существенно снизить вероятность возникновения механических повреждений вызванных падением с небольшой высоты. Степень защиты IP68 не допускает попадания влаги и пыли в аппаратную часть. Это позволяет устройству без каких-либо последствий находиться на глубине до 1.5 метра не дольше 30 минут. SAMSUNG G955FZ Galaxy S8 Plus 64Gb (black) обладает достаточно компактными габаритами - 159.5 x 73.4 x 8.1 мм, а также небольшим весом 173 г, что позволяет ему удобно лежать в руке. Он поддерживает до двух SIM-карт типа Nano-SIM.</span>
    <span class="default-container" style="font-size:19px; font-weight: bold;">Экран</span><br>
    <img src="{{img_url}}-2.jpg">
    <span class="default-container">Эта модель SAMSUNG может похвастаться емкостным дисплеем Super AMOLED с диагональю 6.2 дюйма и разрешением 1440 x 2960 пикселей и функцией мультитач. Он защищен специальным прочным стеклом Corning Gorilla Glass 5. Яркость, контрастность и цветопередача (16 млн) находятся на комфортном для глаз пользователя уровне. Кнопки "домой", "назад" и "недавние приложения" были перенесены на экран для большего удобства. Также появилась возможность разделять экран на две части. Это позволяет переписываться с друзьями в популярных онлайн-сервисах при этом не прерывая просмотр любимых фильмов.</span>
    <span class="default-container" style="font-size:19px; font-weight: bold;">Камеры</span><br>
    <img src="{{img_url}}-3.png">
    <span class="default-container">SAMSUNG G955FZ Galaxy S8 Plus 64Gb (black) оборудован основной камерой на 12 Мп с диафрагмой f/1.7, автофокусом, оптической стабилизацией и светодиодной вспышкой. Имеются функции геотегинга, фокусировки с помощью нажатия на экран, а также распознавания лиц и улыбок. Она способна записывать видео в HDR и 4К, при максимальном качестве съемки 2160p 60fps. Фронтальная камера оборудована матрицей на 8 Мп с диафрагмой f/1.7. Она позволяет делать селфи и совершать видеозвонки.</span>
    <span class="default-container" style="font-size:19px; font-weight: bold;">Память и производительность</span><br>
    <img src="{{img_url}}-4.jpg">
    <span class="default-container">Данная модель SAMSUNG может похвастаться восьмиядерным центральным процессором Samsung Exynos 8895 (4 x 2.3 ГГЦ и 4 x 1.7 ГГц) с видеочипом Mali-G71. Он способен демонстровать высокие показатели быстродействия даже в мультизадачном режиме работы. Объем оперативного запоминающего устройства составляет 4 Гб, а встроенной памяти - 64 Гб. При желании последнюю можно расширить до 256 Гб используя второй слот для SIM-карты. В качестве операционной системы установлена Android версии 7.0. Встроенный литий-ионный аккумулятор емкостью 3500 мАч обеспечивает продолжительный период автономной работы гаджета.</span>
    <span class="default-container" style="font-size:19px; font-weight: bold;">Безопасность</span><br>
    <img src="{{img_url}}-5.jpg">
    <span class="default-container">Этот смартфон имеет сразу несколько функций, которые позволяют надежно обезопасить персональные данные пользователя. Теперь разблокировать мобильное устройство можно используя сканер радужной оболочки, функцию распознавания лиц и сканер отпечатков пальцев.</span>
    <span class="default-container" style="font-size:19px; font-weight: bold;">Дополнительные параметры</span><br>
    <span class="default-container">С помощью модулей Wi-Fi и Bluetooth (5.0) можно быстро обмениваться разнообразными данными с другими гаджетами. Встроенный GPS позволит пользователю сориентироваться на местности как в черте города, так и за его пределами. Для подключения к сети или к ПК имеется порт USB Type-C.</span>
  <br><span style="text-align: center; display: block;"><button ion-button (click)="addToCart()"
              style="background: #ef4123; color: #ffffff; text-transform: none; font-size: 20px; font-weight: 400;
              padding: 20px; margin: 10px 20px 20px 20px;">
              Купить сейчас
      </button></span>
</div>`;
//#endregion
//#region ACTION
const ACTION = `<div style="padding: 20px 20px;">
  <span style="font-size:18px;"><b>Акция</b></span>
  <div style="text-align: center">
    <div style="width: 214px;margin:0px auto">
     <img style="margin-top:10px;width: auto;max-width: 100%;height: auto;max-height: 100%" src='{{img_url}}.jpg'>
     <div style="margin-top:10px"><span style="font-size: 16px;"><b>{{name}}</b></span></div>
    </div>
  <div style="margin-top:10px;"><span style="font-size: 14px"><b>Осталось</b> <b>{{expire?.days}}</b> дн. <b>{{expire?.hours}}</b> ч. <b>{{expire?.minutes}}</b> м. <b>{{expire?.seconds}}</b> с.</span>
</div>
`;
//#endregion
//#region PARTSPAY
const PARTSPAY = `<h3 style='text-align: center'>{{name}}</h3>
<div class='default-container'>
  <span>{{actionActiveLine}}</span>
  <div class='default-timeViewer'>
     <div style='width: 20%;margin-left:3%'>до конца<br/>акции</div>
     <div><b>{{expire?.days}}</b><br/>дни</div>
     <div><b>{{expire?.hours}}</b><br/>часы</div>
     <div><b>{{expire?.minutes}}</b><br/>мин.</div>
     <div><b>{{expire?.seconds}}</b><br/>сек.</div>
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
     <div style='width: 20%;margin-left:3%'>до конца<br/>акции</div>
     <div><b>{{expire?.days}}</b><br/>дни</div>
     <div><b>{{expire?.hours}}</b><br/>часы</div>
     <div><b>{{expire?.minutes}}</b><br/>мин.</div>
     <div><b>{{expire?.seconds}}</b><br/>сек.</div>
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
    'SAMSUNGGS8': SAMSUNGGS8,
    'ACTION': ACTION,
    'PARTSPAY':PARTSPAY,
    'ROUTERGIFT':ROUTERGIFT
  };
}
