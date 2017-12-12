import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from './LoginService';
import {ActivatedRoute, Router} from '@angular/router';
import {Params} from '@angular/router/src/shared';

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
  loginInProgress = false;
  stayLoggedIn = false;
  returnUrl = '';

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
    const params: Params = this.router.routerState.snapshot.root.queryParams;
    if (params.returnUrl !== undefined && Object.keys(params).length !== 0) {
      this.returnUrl = params.returnUrl;
    }
    this.loginService.logout();
  }

  onSubmit() {
    localStorage.setItem('stayLoggedIn', this.stayLoggedIn + '');
    this.loginInProgress = true;
    this.loginService.login(this.loginCommand.login, this.loginCommand.password)
      .subscribe(() => {
          if (this.returnUrl !== '') {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigateByUrl('/orders');
          }
        },
        error2 => {
          this.loginInProgress = false;
        });
  }
}
