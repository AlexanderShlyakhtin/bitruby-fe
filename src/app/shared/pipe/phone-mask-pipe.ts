import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'phoneMaskPipe'
})
export class PhoneMaskPipe implements PipeTransform {

    transform(value: string): string {
        return this.maskPhoneNumber(value);
    }

    private maskPhoneNumber(value: string): string {
        // Remove all non-numeric characters except the leading '+'
        value = value.replace(/[^+\d]/g, '');

        // Format the number as needed
        let masked = '';
        if (value.length > 1) {
            masked += value[0]; // +7
        }
        if (value.length > 2) {
            masked += '(' + value.substring(1, 3); // +7(96
        }
        if (value.length > 3) {
            masked += '*' + ') '; // +7(96*)
        }
        if (value.length > 5) {
            masked += value.substring(4, 7).replace(/\d/g, '*'); // +7(96*) ***
        }
        if (value.length > 7) {
            masked += '-' + value.substring(7, 9); // +7(96*) ***-89
        }
        if (value.length > 9) {
            masked += '-' + value.substring(9, 11); // +7(96*) ***-89-89
        }

        return masked;
    }
}
