import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { formatDate } from "@angular/common";

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    // Add your code here
    constructor(
        @Inject(LOCALE_ID) private localeId: string
    ) {}
    transform(value: any): any {
        if(!value) return "";
        return formatDate(value, "dd.MM.yyyy", this.localeId);
    }
}
