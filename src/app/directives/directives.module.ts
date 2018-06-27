import {NgModule} from "@angular/core";
import {LocaleDirective} from "./locale-directive.directive";

@NgModule({
  declarations:[
    LocaleDirective
  ],
  exports:[
    LocaleDirective
  ]
})

export class DirectivesModule {}
