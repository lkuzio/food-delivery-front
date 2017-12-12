import {ActivatedRouteSnapshot, CanActivate, NavigationExtras, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserDTO} from '../dto/UserDTO';


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
    const navigationExtras: NavigationExtras = {
      queryParams: {
        returnUrl: state.url
      }
    };
    this.router.navigate(['/login'], navigationExtras);
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
    const login = localStorage.getItem('user_login');
    const id = localStorage.getItem('user_id');
    const email = localStorage.getItem('user_email');
    const name = localStorage.getItem('user_name');
    const user = new UserDTO(id, name, email, login);
    return user;
  }

}
