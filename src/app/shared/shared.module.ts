import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {PhoneInputMaskDirective} from "./directives/phone-input-mask-directive";
import {PipeModule} from "./pipe/pipe.module";
import {LogoComponent} from "./logo/logo.components";
import {StatusTranslatePipe} from "./pipe/status-translate-pipe";


@NgModule({
  declarations: [
    PhoneInputMaskDirective,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    PipeModule,
    NgOptimizedImage


  ],
  exports: [
    PhoneInputMaskDirective,
    LogoComponent
  ]
})
export class SharedModule { }
