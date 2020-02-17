import { DatabaseService } from './../../sharedservices/database.service';
import { MatTable } from '@angular/material/table';
import { Flight } from 'src/app/sharedmodels/flight.model';
import { Router, ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as adminflightActions from '../store/flight.action';
import { map } from 'rxjs/operators';
import { ViewChild, OnInit, Component } from '@angular/core';

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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private databaseservice: DatabaseService,
              private store: Store<fromApp.AppState>) {}

  ngOnInit() {
  //   // this.table.dataSource = new FlightListDataSource(this.databaseservice, this.store);
     this.databaseservice.getAllFlights().subscribe((flights: Flight[]) => {
      this.store.dispatch(new adminflightActions.GetFlightsActionAdmin(flights));
  });

     this.store.select('adminflights').pipe(map(getFlights => getFlights.adminflights)).subscribe((flight: Flight[]) => {
    if (flight.length !== 0 && this.table) {
    this.table.dataSource = flight;
    }
    });
}



  fun(id: number) {
    this.router.navigate(['passengerlist', id]);
  }
}
