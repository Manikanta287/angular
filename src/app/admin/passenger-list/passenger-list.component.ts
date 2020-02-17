import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AdminService } from './../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Passenger } from 'src/app/sharedmodels/passengers.model';
import { DatabaseService } from 'src/app/sharedservices/database.service';
import { ActivatedRoute } from '@angular/router';
import { Flight } from 'src/app/sharedmodels/flight.model';
import { UpdatePassengerDetailsComponent } from '../update-passenger-details/update-passenger-details.component';
import { AddpassengerComponent } from '../addpassenger/addpassenger.component';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as fromAdmin from '../store/flight.action';

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.css']
})
export class PassengerListComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable, {static: false}) table: MatTable<Passenger>;
  columnsToDisplay = ['passengername', 'checkedInStatus', 'requirewheelChair', 'withInfants', 'Address', 'Passport'];

  passegners: Passenger[];
  id: number;
  index: number;
  addpassengerSubscription: Subscription;

  constructor(private dataservice: DatabaseService,
              private route: ActivatedRoute,
              private matdialog: MatDialog,
              private adminservice: AdminService,
              private store: Store<fromApp.AppState> ) { }

  filter = new FormGroup({
    Address: new FormControl(''),
    passport: new FormControl('')
  });
  ngOnInit() {

    // subject for adding the new passenger
    this.addpassengerSubscription = this.adminservice.addpassenger.subscribe(add => {
      if (add === 'AddPassenger') {
         this.addpassengers();
      }
    });
    this.route.params.subscribe(params => {
      this.id = +params.id;
    });
    this.dataservice.getAllFlights().subscribe((flights: Flight[]) => {
      this.store.dispatch(new fromAdmin.GetFlightsActionAdmin(flights));
    });

    this.store.select('adminflights').pipe(map(flights => flights.adminflights)).subscribe(
      (flight: Flight[]) => {
        if (flight.length !== 0 && this.table) {
           this.passegners = flight[this.id].passengersDetails;
           this.table.dataSource = this.passegners;
        }
      }
    );
  }

  applyFilter() {
    console.log(this.filter.value);
    this.table.dataSource = this.passegners.slice().filter(p => {
      const f1 = this.filters(p, 'Address');
      const f2 = this.filters(p, 'passport');
      if (f1 && f2) {
        return p;
      }
    });
  }

  filters(p: Passenger, on: string) {
    if (on.includes('Address')) {
      if (this.filter.value.Address === '' || this.filter.value.Address === null) {
        return true;
      } else if (p.Address === '') {
        return true;
      } else {
        return false;
      }
    }
    if (on.includes('passport')) {
      if (this.filter.value.passport === '' || this.filter.value.passport === null) {
        return true;
      } else if (p.passportNumber === '') {
        return true;
      } else {
        return false;
      }
    }
  }

  clearFilters() {
    this.filter.reset();
    this.table.dataSource = this.passegners;
  }

  editPassengerDetails(user: Passenger) {
    this.getIndex(user);
    this.matdialog.open(UpdatePassengerDetailsComponent, {
      data: { User: user, Index: this.index, flightId: this.id}
    });
  }

  getIndex(user: Passenger) {

   this.passegners.filter((u, index1) => {
      if (u.passengername === user.passengername) {
        this.index = index1;
      }
    });
   return this.index;
  }
  addpassengers() {
    if (this.passegners.length === 52) {
      alert('No Seats Available');
    } else if (this.passegners.length !== 52) {
    this.matdialog.open(AddpassengerComponent, {
      data: {flightId: this.id}
    });
    }
 }

 ngOnDestroy() {
   if (this.addpassengerSubscription) {
     this.addpassengerSubscription.unsubscribe();
   }
 }
}
