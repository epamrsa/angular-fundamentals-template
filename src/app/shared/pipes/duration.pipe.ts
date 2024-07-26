import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    // Add your code here
    transform(value: any): any {
        if (!value) return "";
        if (value < 0) return "00:00 hours";
        let mins = value % 60;
        let hours = Math.floor(value / 60);
        let result = ("0" + hours).slice(-2) + ":" + ("0" + mins).slice(-2);
        if (hours < 2) return  result + " hour";
        else return result + " hours";
    }
}
