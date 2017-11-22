import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {AuthService} from "./AuthService";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.getToken() != null) {

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
