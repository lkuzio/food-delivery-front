import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AlertService} from "../../commons/alert/alert.service";
import {RegisterUserCommand} from "../../dto/RegisterUserCommand";
import {ValidationError} from "../../dto/ValidationError";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";


@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient,
              private alertService: AlertService) {
  }

  register(registrationDTO: RegisterUserCommand): Observable<RegisterUserCommand> {
    return this.http.post("registration",
      registrationDTO,
      {headers: {"Content-Type": "application/json"}})
      .pipe(
        catchError(err => {
            if (err.error.message === "VALIDATION_ERROR") {
              var error: ValidationError = err.error;
              var validationMessage = "";
              error.fieldErrors.forEach(x => validationMessage += x.message);
              this.alertService.error(validationMessage)
              return Observable.empty();
            } else {
              this.alertService.error(err.error.message);
            }
            return Observable.throw(err);
          }
        ));
  }


}
