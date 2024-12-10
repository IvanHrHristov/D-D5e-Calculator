import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { matchPasswordValidator } from '../utils/match-passwords.validator';

@Directive({
  selector: '[appPassword]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: PasswordDirective,
  }],
})
export class PasswordDirective implements Validator {
  @Input() appPassword: string[] = [];

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('this.appPassword');
    
    console.log(this.appPassword);

    console.log('this.appPassword[0]');

    console.log(this.appPassword[0]);

    console.log('this.appPassword[1]');

    console.log(this.appPassword[1]);
    
    
    const ValidatorFn = matchPasswordValidator(this.appPassword[0], this.appPassword[1]);

    return ValidatorFn(control);
  }
}