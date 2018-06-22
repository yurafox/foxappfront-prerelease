import {NgModule} from "@angular/core";
import {LocaleDirective} from "./locale-directive.directive";
import {AotIf} from './fox-aot-if';

@NgModule({
  declarations:[
    LocaleDirective,
    AotIf
  ],
  exports:[
    LocaleDirective,
    AotIf
  ]
})

export class DirectivesModule {}
