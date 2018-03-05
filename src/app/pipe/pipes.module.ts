import { NgModule } from '@angular/core';
import { LocaleCurrencyPipe } from './locale-currency-pipe/locale-currency.pipe';
import {TruncatePipe} from './truncate/truncate';
import {SafeHtmlPipe} from './safe-html/safe-html';

@NgModule({
  declarations: [
    LocaleCurrencyPipe,
    TruncatePipe,
    SafeHtmlPipe
  ],
  imports: [

  ],
  exports: [
    LocaleCurrencyPipe,
    TruncatePipe,
    SafeHtmlPipe
  ]
})

export class PipesModule {}
