import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhoneMaskPipe} from "./phone-mask-pipe";
import {EmailMaskDisplayPipe} from "./email-mask-pipe";
import {StatusTranslatePipe} from "./status-translate-pipe";


@NgModule({
    declarations: [
        PhoneMaskPipe,
        EmailMaskDisplayPipe,
        StatusTranslatePipe
    ],
    imports: [
        CommonModule,


    ],
    exports: [
        PhoneMaskPipe,
        EmailMaskDisplayPipe,
        StatusTranslatePipe
    ]
})
export class PipeModule {
}
