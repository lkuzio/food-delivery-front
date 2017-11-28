import {Component, ViewEncapsulation} from '@angular/core';
import {AlertService} from "../../commons/alert/alert.service";
import {Router} from "@angular/router";
import {RegisterUserCommand} from "../../dto/RegisterUserCommand";
import {RegistrationService} from "./RegistrationService";


@Component({
  selector: 'registration-form',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class RegistrationComponent {

  constructor(private router: Router, private registrationService: RegistrationService, private alertService: AlertService) {
  }

  registerUserCommand = new RegisterUserCommand();
  registerInProgress: boolean = false;

  onSubmit() {
    this.registerInProgress = true;
    this.registrationService.register(this.registerUserCommand).subscribe(() => {
        this.router.navigateByUrl('login')
        this.alertService.success("User created!");
      },
      error2 => {
        this.registerInProgress = false;
      });

  }

}
