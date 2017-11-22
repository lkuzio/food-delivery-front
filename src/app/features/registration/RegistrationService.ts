import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AlertService} from "../../commons/alert/alert.service";
import {RegisterUserCommand} from "../../dto/RegisterUserCommand";
import {ValidationError} from "../../dto/ValidationError";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";


@Injectable()
export class RegistrationService {

  private url = '/registrations';

  constructor(private http: HttpClient,
              private alertService: AlertService) {
  }

  register(registrationDTO: RegisterUserCommand): Observable<RegisterUserCommand> {
    return this.http.post("http://localhost:8080/registration",
      registrationDTO,
      {headers: {"Content-Type": "application/json"}})
      .pipe(
        catchError(err => {
            if (err.error.message.equal("VALIDATION_ERROR")) {
              var errorList: ValidationError = JSON.parse(err);
              this.alertService.error(errorList.message);
            } else {
              this.alertService.error(err.error.message);
            }
            return Observable.throw(err);
          }
        ));
  }


}
