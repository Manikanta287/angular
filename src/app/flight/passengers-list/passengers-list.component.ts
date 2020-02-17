import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { Flight } from './../../sharedmodels/flight.model';
import { DatabaseService } from './../../sharedservices/database.service';
import { Passenger} from './../../sharedmodels/passengers.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  MatTable } from '@angular/material/table';
import {  FormGroup, FormControl } from '@angular/forms';
import { UpdatePassengerComponent } from '../update-passenger/update-passenger.component';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as flightActions from '../store/flight.action';

@Component({
  selector: 'app-passengers-list',
  templateUrl: './passengers-list.component.html',
  styleUrls: ['./passengers-list.component.css']
})
export class PassengersListComponent implements OnInit {

  constructor(private dataservice: DatabaseService,
              private route: ActivatedRoute,
              private matdialog: MatDialog,
              private store: Store<fromApp.AppState>
              ) { }
  passegners: Passenger[];
  id: number;
  index: number;
  @ViewChild(MatTable, {static: false}) table: MatTable<Passenger>;
  columnsToDisplay = ['passengername', 'checkedInStatus', 'requirewheelChair', 'withInfants'];

  filter = new FormGroup({
    checkIn: new FormControl(''),
    wheelchair: new FormControl(''),
    infants: new FormControl('')
  });
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params.id2;
    });
    this.dataservice.getAllFlights().subscribe((flights: Flight[]) => {
      this.store.dispatch(new flightActions.GetFlightsAction(flights));
    });

    this.store.select('flights').pipe(map(flightlist => flightlist.flights)).subscribe(
      (flights: Flight[]) => {
        if (flights.length !== 0 && this.table) {
          this.passegners = flights[this.id].passengersDetails;
          this.table.dataSource = this.passegners;
        }
      }
    );
  }
  applyFilter() {
    this.table.dataSource = this.passegners.slice().filter(p => {
      const f1 = this.filters(p, 'chcekIn');
      const f2 = this.filters(p, 'wheel');
      const f3 = this.filters(p, 'infants');
      if (f1 && f2 && f3) {
        return p;
      }
    });
  }

  filters(p: Passenger, on: string) {
    if (on.includes('chcekIn')) {
      if (this.filter.value.checkIn === '' || this.filter.value.checkIn === null) {
        return true;
      } else if (p.checkedInStatus === (this.filter.value.checkIn === 'true' ? true : false)) {
        return true;
      } else {
        return false;
      }
    }
    if (on.includes('wheel')) {
      if (this.filter.value.wheelchair === '' || this.filter.value.wheelchair === null) {
        return true;
      } else if (p.requirewheelChair === (this.filter.value.wheelchair === 'true' ? true : false)) {
        return true;
      } else {
        return false;
      }
    }
    if (on.includes('infants')) {
      if (this.filter.value.infants === '' || this.filter.value.infants === null) {
        return true;
      } else if (p.withInfants === (this.filter.value.infants === 'true' ? true : false)) {
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
    this.matdialog.open(UpdatePassengerComponent, {
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
}
