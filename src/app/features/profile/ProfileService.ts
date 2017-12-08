import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserDTO} from '../../dto/UserDTO';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  private URL = 'profile';

  getProfile(): Observable<UserDTO> {
    return this.http.get(this.URL)
      .pipe(catchError(err => {
          return Observable.throw(err);
        }
      ));
  }

  updateProfile(newProfile: UserDTO) {
    return this.http.put(this.URL, newProfile)
      .pipe(
        catchError(err => {
          return Observable.throw(err);
        }
      ));
  }
}
