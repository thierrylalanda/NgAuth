import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import {Iuser} from '../models/user';
@Injectable()
export class AuthService {
user;
  constructor(public router: Router, private http: Http) {
  }

  login(loginform): Observable< Iuser[] > {
    return this.http.get('assets/data/users.json')
      .map((response) => {
        // login successful if there's a jwt token in the response
       this.user = response.json();
        if (this.user && this.user[0].idToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          localStorage.setItem('access_token', JSON.stringify(this.user[0].access_token));
          localStorage.setItem('id_token', JSON.stringify(this.user[0].idToken));
          localStorage.setItem('expires_at', JSON.stringify(new Date().getTime() + (5 * 60)));
          return < Iuser[] > response.json();
        }
      });

  }
  private handleError(errorResponse: Response) {
    console.log(errorResponse.statusText);
    return Observable.throw(errorResponse.json().error || 'Server error');
  }
public getAcces(): object {
    return JSON.parse((localStorage.getItem('access_token')));
}

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

  }
  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }


  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return localStorage.getItem('currentUser') != null && localStorage.getItem('id_token') != null  ? true : false;
  }
}
