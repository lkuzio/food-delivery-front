import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {


  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(event => {
    }, err => {
      if (err instanceof HttpErrorResponse && err.status == 401) {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
        location.reload();
      }
    });
  }

}
