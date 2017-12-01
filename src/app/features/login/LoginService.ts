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

  constructor(private http: HttpClient,
              private router: Router,
              private alertService: AlertService) {
    setInterval(() => {
      if (Date.parse(localStorage.getItem("token_expires_in")) <= Date.now()) {
        if (localStorage.getItem("stayLoggedIn") == "true") {
          this.refreshToken();
        } else {
          this.logout();
        }
      }

    }, 5000);
  }

  private refreshToken() {
    debugger;
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', localStorage.getItem("refresh_token"));

    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa(this.CLIENT_ID + ":" + this.CLIENT_SECRET)
    });
    const options = {headers: headers};

    return this.http.post('oauth/token', params.toString(), options)
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
      )
  }

  private extractAuthenticationResponse(response: LoginResponse) {
    localStorage.setItem('token', response.access_token);
    localStorage.setItem('user_id', response.user.id);
    localStorage.setItem('user_login', response.user.login);
    localStorage.setItem('user_email', response.user.email);
    localStorage.setItem('user_name', response.user.name);
    localStorage.setItem('refresh_token', response.refresh_token);
    localStorage.setItem("token_expires_in", Date.now() + response.expires_in.toString());
  }

  login(username: string, password: string) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');

    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa(this.CLIENT_ID + ":" + this.CLIENT_SECRET)
    });
    const options = {headers: headers};

    return this.http.post('oauth/token', params.toString(), options)
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

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
    //location.reload();
  }

}
