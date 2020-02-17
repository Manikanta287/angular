import { FlightServiceService } from './../flight-service/flight-service.service';
import { DatabaseService } from './../../sharedservices/database.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Flight } from 'src/app/sharedmodels/flight.model';
import { Router, ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as flightActions from '../store/flight.action';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  @ViewChild(MatTable, {static: false}) table: MatTable<Flight>;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Airlines', 'ScheduledTime'];
  flights: Flight[] = [];
  photourl: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private databaseservice: DatabaseService,
              private flightservice: FlightServiceService,
              private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.databaseservice.getAllFlights().subscribe((flights: Flight[]) => {
      this.store.dispatch(new flightActions.GetFlightsAction(flights));
    });

    this.store.select('flights').pipe(map(getFlights => getFlights.flights)).subscribe((flight: Flight[]) => {
      if (flight.length !== 0 && this.table) {
      this.table.dataSource = flight;
      }}, error => {
        console.log('error in fetching flights');
      });
  }


  fun(id: number) {
    if (this.router.url.includes('flights')) {
      this.router.navigate(['../flightdetails', id], {relativeTo: this.route});
      this.flightservice.enableoperations.next(true);
    } else {
      this.router.navigate(['flightdetails', id], {relativeTo: this.route});
      this.flightservice.enableoperations.next(true);
    }
  }
}
