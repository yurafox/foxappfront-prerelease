import { trigger, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
   trigger('fadeInAnimation', [
       transition(':enter', [
           style({ opacity: 0 }),
           animate(1000, style({ opacity: 1 }))
       ]),
   ]);


export const fadeInAnimation500 =
  trigger('fadeInAnimation500', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(500, style({ opacity: 1 }))
    ]),
  ]);
