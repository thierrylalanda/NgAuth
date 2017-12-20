import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import {MatSnackBar} from '@angular/material';

import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router, public snackBar: MatSnackBar) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.auth.isAuthenticated()) {
            console.log('PERMSSION ACCORDEE');
          console.log(this.auth.getAcces());
            return true;

        } else {
            console.log('PERMSSION NON ACCORDEE');
          const message  = 'vous voulez acceder a une page sans etre connecté';
          this.snackBar.open(message, 'connecter vous', {
            duration: 5000,
          });
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/'], { queryParams: { returnUrl: state.url, info : 'pas access' }});
          return false;
        }

    }

}
