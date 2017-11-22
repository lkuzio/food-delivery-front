import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserDTO} from "../dto/UserDTO";


@Injectable()
export class AuthService implements CanActivate {

  route: ActivatedRouteSnapshot;

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.route = route;
    if (localStorage.getItem('token')) {
      return true;
    }

    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }


  getToken(): string {
    return localStorage.getItem('token');
  }

  getUser(): UserDTO {
    var login = localStorage.getItem('user_login');
    var id = localStorage.getItem('user_id');
    var email = localStorage.getItem('user_email');
    var name = localStorage.getItem('user_name');
    var user = new UserDTO(id, name, email, login);
    return user;
  }

}
