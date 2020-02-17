import { Store } from '@ngrx/store';
import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { AuthService } from 'angularx-social-login';

import * as formApp from '../../store/app.reducer';
import * as formHome from '../store/home.actions';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('178030695953-cjca72h6cc6ra3q15u84nvg5pc3uqr11.apps.googleusercontent.com')
  },
]);
export function provideConfig() {
  return config;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: SocialUser;
  private loggedInstatus: boolean;

  constructor(private router: Router,
              private authservice: AuthService,
              private store: Store<formApp.AppState>) { }

  login = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.minLength(6)])
  });
  ngOnInit() {
    this.authservice.authState.subscribe((user) => {
      this.user = user;
      this.loggedInstatus = (user != null);
      if (this.loggedInstatus) {
        this.store.dispatch(new formHome.HomeAction({user: 'staff', status: this.loggedInstatus}));
        this.router.navigate(['flight']);
      } else {
        this.store.dispatch(new formHome.HomeAction({user: '', status: this.loggedInstatus}));
      }
    });
  }

  logIn(user: string) {
    if (user === 'staff') {
    this.authservice.signIn(GoogleLoginProvider.PROVIDER_ID);
    } else if (user === 'admin') {
      if (this.login.value.email === 'admin@mairlines.com' && this.login.value.password === 'admin@123') {
        this.store.dispatch(new formHome.HomeAction({user: 'admin', status: true}));
        this.router.navigate(['admin']);
      }
    }
  }

}
