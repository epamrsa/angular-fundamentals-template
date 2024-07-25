import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

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
    private emailRe = /.+@.+\..+/;
    validate(control: AbstractControl): ValidationErrors | null {
        return this.emailRe.test(control.value) ? null : { emailValidator: { email: control.value } };
    }
}
