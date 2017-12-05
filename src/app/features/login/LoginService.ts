import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {UserDTO} from "../../dto/UserDTO";
import {AlertService} from "../../commons/alert/alert.service";
import {environment} from "../../../environments/environment";

class LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: UserDTO;
}

@Injectable()
export class LoginService {

  private CLIENT_ID: string = environment.clientId;
  private CLIENT_SECRET: string = environment.clientSecret;

  headers = new HttpHeaders({
    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Authorization': 'Basic ' + btoa(this.CLIENT_ID + ":" + this.CLIENT_SECRET)
  });
  options = {headers: this.headers};

  constructor(private http: HttpClient,
              private router: Router,
              private alertService: AlertService) {
    setInterval(() => {

      if (localStorage.getItem("stayLoggedIn") != null) {
        if (Number.parseInt(localStorage.getItem("token_expires_in")) <= Date.now().valueOf()) {
          if (localStorage.getItem("stayLoggedIn") == "true") {
            this.refreshToken();
          } else {
            this.logout();
          }
        }
      }

    }, 5000);
  }

  refreshToken() {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', localStorage.getItem("refresh_token"));

    this.http.post('oauth/token', params.toString(), this.options)
      .pipe(
        tap((response: LoginResponse) => {
            if (response) {
              this.extractAuthenticationResponse(response);
            }
          },
          e => {
            this.logout();
          }
        )
      ).subscribe(() => {

    });
  }

  login(username: string, password: string) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');

    return this.http.post('oauth/token', params.toString(), this.options)
      .pipe(
        tap((response: LoginResponse) => {
            if (response) {
              this.extractAuthenticationResponse(response);
            }
          },
          e => {
            this.alertService.error("Invalid username or password");
          }
        )
      )
  }


  private extractAuthenticationResponse(response: LoginResponse) {
    localStorage.setItem('token', response.access_token);
    localStorage.setItem('user_id', response.user.id);
    localStorage.setItem('user_login', response.user.login);
    localStorage.setItem('user_email', response.user.email);
    localStorage.setItem('user_name', response.user.name);
    localStorage.setItem('refresh_token', response.refresh_token);
    localStorage.setItem("token_expires_in", (Date.now() + response.expires_in * 1000).toString());
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_login');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem("token_expires_in");
    localStorage.removeItem("stayLoggedIn");
    this.router.navigateByUrl('/login');
  }

}
