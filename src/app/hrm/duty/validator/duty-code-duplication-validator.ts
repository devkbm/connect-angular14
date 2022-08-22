import {  AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DutyCodeService } from '../service/duty-code.service';

export function existingDutyCodeValidator(dutyCodeService: DutyCodeService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

    return control.value ? dutyCodeService
              .getValidDutyCode(control.value)
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
