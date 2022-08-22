import {  AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { HrmCodeService } from '../service/hrm-code.service';

export function existingHrmTypeValidator(hrmCodeService: HrmCodeService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    console.log(control.root);
    console.log(control.parent?.get('hrmType')?.value);
    return control.value ? hrmCodeService
              .getVaildHrmType(control.parent?.get('hrmType')?.value + control.value)
              .pipe(
                map( responseObj => {
                  if ( responseObj.data === true ) {
                    return {exists: responseObj.message};
                  } else {
                    return null;
                  }
                } )
              ) : new Observable<null>();
  };
}
