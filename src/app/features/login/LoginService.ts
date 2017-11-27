import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {UserDTO} from "../../dto/UserDTO";
import {AlertService} from "../../commons/alert/alert.service";

class LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: UserDTO;
}

@Injectable()
export class LoginService {

  constructor(private http: HttpClient,
              private router: Router,
              private alertService: AlertService) {
  }

  login(username: string, password: string) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');

    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa('asdasdasd:asdasdasd')
    });
    const options = {headers: headers};

    return this.http.post('oauth/token', params.toString(), options)
      .pipe(
        tap((response: LoginResponse) => {
            if (response) {
              localStorage.setItem('token', response.access_token);
              localStorage.setItem('user_id', response.user.id)
              localStorage.setItem('user_login', response.user.login)
              localStorage.setItem('user_email', response.user.email)
              localStorage.setItem('user_name', response.user.name)

            }
          },
          e => {
            this.alertService.error("Invalid username or password");
          }
        )
      )

  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    location.reload();
  }

}
