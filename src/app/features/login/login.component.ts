import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from "./LoginService";
import {Router} from "@angular/router";

export class LoginCommand {
  login: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  loginCommand = new LoginCommand();
  loginInProgress: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.loginInProgress = true;
    this.loginService.login(this.loginCommand.login, this.loginCommand.password)
      .subscribe(() => {
          this.router.navigateByUrl("/orders");
        },
        error2 => {
          this.loginInProgress = false;
        });
  }
}
