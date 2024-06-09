import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhoneMaskPipe} from "./phone-mask-pipe";
import {EmailMaskDisplayPipe} from "./email-mask-pipe";


@NgModule({
    declarations: [
        PhoneMaskPipe,
        EmailMaskDisplayPipe
    ],
    imports: [
        CommonModule,


    ],
    exports: [
        PhoneMaskPipe,
        EmailMaskDisplayPipe
    ]
})
export class PipeModule {
}
