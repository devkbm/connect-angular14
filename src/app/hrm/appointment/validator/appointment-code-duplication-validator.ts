import {  AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { AppointmentCodeService } from '../service/appointment-code.service';

export function existingAppointmentCodeValidator(appointmentCodeService: AppointmentCodeService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    //console.log(control.root);
    //console.log(control.parent.get('typeId').value);
    return control.value ? appointmentCodeService
              .getValidAppointmentCode(control.value)
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
