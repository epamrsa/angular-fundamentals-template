import {Directive, Input} from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

@Directive({
    selector: '[authorValidator]',
    providers: [/*Add your code here*/{
        provide: NG_VALIDATORS,
        useExisting: AuthorValidatorDirective,
        multi: true,
    }]
})
export class AuthorValidatorDirective implements Validator {
    @Input("authorValidator") length = "0"
    validate(control: AbstractControl): ValidationErrors | null {
        return authorValidator(parseInt(this.length))(control);
    }
}

export function authorValidator(length: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value.length < length || /^[A-Za-z0-9 ]*$/.test(control.value) ? null : { authorValidator: { author: control.value } };
    };
}
