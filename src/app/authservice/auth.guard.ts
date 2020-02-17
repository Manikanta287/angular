import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import * as formApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loggedin = false;
  constructor(private store: Store<formApp.AppState>,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.store.select('login').subscribe(user => {
      if (user.status && 'staff' === next.data.role) {
        this.loggedin = true;
      } else if (user.status && 'admin' === next.data.role) {
        this.loggedin = true;
      } else {
        this.loggedin = false;
        this.router.navigate(['/home']);
      }
    });
    return this.loggedin;
  }
}
