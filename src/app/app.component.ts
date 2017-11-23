import {Component} from '@angular/core';
import {AuthService} from "./commons/AuthService";
import {LoginService} from "./features/login/LoginService";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  authService: AuthService;
  loginService: LoginService;
  router: Router;

  constructor(authService: AuthService,
              loginService: LoginService,
              router: Router) {
    this.authService = authService;
    this.loginService = loginService;
    this.router = this.router;
  }

  public getActiveUrl(url:string):string{
    if(this.router.url.indexOf(url)>-1){
      return "mat-button-rised";
    }
  }
}
