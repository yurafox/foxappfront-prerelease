import { NgModule } from '@angular/core';
import { LocaleCurrencyPipe } from './locale-currency-pipe/locale-currency.pipe';
import {TruncatePipe} from './truncate/truncate';

@NgModule({
  declarations: [
    LocaleCurrencyPipe,
    TruncatePipe
  ],
  imports: [

  ],
  exports: [
    LocaleCurrencyPipe,
    TruncatePipe
  ]
})

export class PipesModule {}
