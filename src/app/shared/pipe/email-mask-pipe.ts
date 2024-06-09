import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'emailMaskDisplay'
})
export class EmailMaskDisplayPipe implements PipeTransform {

    transform(value: string): string {
        return this.maskEmail(value);
    }

    private maskEmail(value: string): string {
        const [localPart, domain] = value.split('@');
        if (!localPart || !domain) {
            return value; // Return original value if it's not a valid email
        }

        if (localPart.length > 3) {
            return `${localPart[0]}${localPart[1]}${localPart[2]}*@${domain}`;
        } else {
            return `${localPart[0]}*${localPart.slice(1).replace(/./g, '*')}@${domain}`;
        }
    }
}
