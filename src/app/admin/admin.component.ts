import { Store } from '@ngrx/store';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay, filter } from 'rxjs/operators';
import { AdminService } from './admin.service';
import * as formApp from '../store/app.reducer';
import * as formHome from '../home/store/home.actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
enable = false;
  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private adminservice: AdminService,
              private store: Store<formApp.AppState>
              ) { }

  ngOnInit() {
    if (this.router.url.includes('passengerlist')) {
       this.enable = true;
    }

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

  addpassengers() {
    this.adminservice.addpassenger.emit('AddPassenger');
  }

  Logout() {
    this.store.dispatch(new formHome.HomeAction({user: '', status: false}));
  }

}
