import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {NavigationExtras, Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {


  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(event => {
    }, err => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_login');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_name');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token_expires_in');
        localStorage.removeItem('stayLoggedIn');
        const navigationExtras: NavigationExtras = {
          queryParams: {
            returnUrl: this.router.url
          }
        };
        this.router.navigate(['/login'], navigationExtras);
      }
    });
  }

}
