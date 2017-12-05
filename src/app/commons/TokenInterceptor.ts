import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {AuthService} from "./AuthService";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private API_URL: string = environment.apiEndpoint;

  constructor(public auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({url: this.API_URL + request.url});
    if (this.auth.getToken() != null) {

      if (request.url.indexOf("auth/token") == -1) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.auth.getToken()}`
          }
        });
      }

    }
    return next.handle(request);
  }
}
