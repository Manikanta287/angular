import { PassengerDetailsComponent } from './../passenger-details/passenger-details.component';
import { Passenger } from './../../sharedmodels/passengers.model';
import { FlightServiceService } from './../flight-service/flight-service.service';
import { DatabaseService } from './../../sharedservices/database.service';
import { Flight } from 'src/app/sharedmodels/flight.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit, OnDestroy {

  constructor(private datastorageservice: DatabaseService,
              private route: ActivatedRoute,
              private flightservice: FlightServiceService,
              private dialog: MatDialog,
              private router: Router,
              ) { }

  seatcolor = 'rgb(216, 211, 211)';
  flighdetals: Flight;
  flights: Flight[];
  id: number;
  operation = '';
  type = 'passengerdetials';
  flightdatasub: Subscription;

  ngOnInit() {
    this.operation = 'Passengers with ' + this.type + ' :-';

    // getting the flight id
    this.route.paramMap.subscribe(param => {
     this.id = +param.get('id');
    });

    // getting the fligh details form database
    this.flightdatasub = this.datastorageservice.getAllFlights().subscribe((flights: Flight[]) => {
      this.flights = flights;
      this.flighdetals = this.flights[this.id];
    });

    // type of operation on the flight
    this.flightservice.operation.subscribe((type: string) => {
      this.type = type;
      if (this.router.url.includes('passengers') && this.type.includes('passengerdetials')) {
        this.router.navigate(['/flight/flightdetails', this.id]);
      }
      if (type.includes('CheckedIn')) {
        this.operation = 'Passengers Who ' + type + ' :-';
      } else {
        this.operation = 'Passengers with ' + type + ' :-';
      }
    });

  }

  setSeatcolor(passenger: Passenger) {
    if (this.type.includes('passengerdetials')) {
      return 'rgb(216, 211, 211)';
    } else if (this.type.includes('CheckedIn')) {
      if (passenger.checkedInStatus === true) {
        return 'green';
      } else {
        return 'rgb(216, 211, 211)';
      }
    } else if (this.type.includes('WheelChair')) {
      if (passenger.requirewheelChair === true) {
        return 'red';
      } else {
        return 'rgb(216, 211, 211)';
      }
    } else if (this.type.includes('Infants')) {
      if (passenger.withInfants === true) {
        return 'blue';
      } else {
        return 'rgb(216, 211, 211)';
      }
    } else if (this.type.includes('PassengersList')) {
      this.router.navigate(['../../passengers', this.id], {relativeTo: this.route});
    }

  }

  clickOnSeat(index: number) {
    if (this.type.includes('CheckedIn')) {
      if (this.flighdetals.passengersDetails[index].checkedInStatus === true) {
        // tslint:disable-next-line: no-unused-expression
        this.flighdetals.passengersDetails[index].checkedInStatus = false;
      } else {
        // tslint:disable-next-line: no-unused-expression
        this.flighdetals.passengersDetails[index].checkedInStatus = true;
      }
      this.flights[this.id] = this.flighdetals;
      this.datastorageservice.addFlightDetail(this.flights).subscribe();
    } else if (this.type.includes('passengerdetials')) {
      this.dialog.open(PassengerDetailsComponent, {
        data: this.flighdetals.passengersDetails[index],
         width: '400px'
        });
    }
  }

  ngOnDestroy() {
    if (this.flightdatasub) {
      this.flightdatasub.unsubscribe();
    }
  }

}
