import { Store } from '@ngrx/store';
import { FlightServiceService } from './flight-service/flight-service.service';
import { Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'angularx-social-login';

import * as fromApp from '../store/app.reducer';
import * as fromHome from '../home/store/home.actions';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    enable = false;
    panelOpenState = false;
    ngOnInit() {
      // Enabling the options for flight operations
      if (this.router.url.includes('passengers')  || this.router.url.includes('flightdetails')) {
        this.enable = true;
      } else {
        this.enable = false;
      }
      // Enabling the options for flight operations based on change in routes
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        if (event.url.includes('passengers')  || event.url.includes('flightdetails')) {
          this.enable = true;
        } else {
          this.enable = false;
        }
      });
    }

    // tslint:disable-next-line: whitespace
  constructor(private breakpointObserver: BreakpointObserver,
              private flightservice: FlightServiceService,
              private router: Router,
              private authservice: AuthService,
              private store: Store<fromApp.AppState>
    ) {}

  Operations(type: string) {
    this.flightservice.operation.next(type);
  }

  closeExpand() {
    if (this.panelOpenState) {
    this.panelOpenState = false;
    }
  }

  Logout() {
    this.authservice.signOut();
    this.store.dispatch(new fromHome.HomeAction({user: '', status: false}));
    this.router.navigate(['/home']);
  }



}
