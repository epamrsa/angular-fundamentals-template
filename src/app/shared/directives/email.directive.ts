import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [/*Add your code here*/{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi: true,
    }]
})
export class EmailValidatorDirective implements Validator {
    // Add your code here
    validate(control: AbstractControl): ValidationErrors | null {
        return emailValidator()(control);
    }
}

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return /^$|.+@.+\..+/.test(control.value) ? null : { emailValidator: { email: control.value } };
    };
}
