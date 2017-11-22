import {Component} from '@angular/core';
import {AuthService} from "./commons/AuthService";
import {LoginService} from "./features/login/LoginService";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  authService: AuthService;
  loginService: LoginService;

  constructor(authService: AuthService,
              loginService: LoginService) {
    this.authService = authService;
    this.loginService = loginService;
  }
}
