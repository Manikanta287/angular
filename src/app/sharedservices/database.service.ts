import { FormGroup } from '@angular/forms';
import { Ancillary } from './../sharedmodels/passengers.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from '../sharedmodels/flight.model';
import { Passenger } from '../sharedmodels/passengers.model';
import * as formApp from '../store/app.reducer';
import * as formAdmin from '../admin/store/flight.action';
import * as fromStaff from '../flight/store/flight.action';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  flightslist: Flight[] = [];
  passenger1: Passenger;
  passenger2: Passenger;

  constructor(private http: HttpClient, private store: Store<formApp.AppState>) { }

  addFlightDetail(flight: Flight[]) {
    return this.http.put('https://airlines-1.firebaseio.com/airlines-1.json', flight);
  }

  getAllFlights() {
    return this.http.get('https://airlines-1.firebaseio.com/airlines-1.json');
  }

  updatePassegerDetails(passengerdetails: FormGroup, pid: number, fid: number) {
    this.passenger1 = new Passenger(passengerdetails.value.name,
      passengerdetails.value.checkIn === 'true' ? true : false,
      passengerdetails.value.wheelChair === 'true' ? true : false,
      passengerdetails.value.infants === 'true' ? true : false,
      new Ancillary([passengerdetails.value.meal], 10),
      passengerdetails.value.address,
      passengerdetails.value.passport);
    this.getAllFlights().subscribe((flights: Flight[]) => {
      this.flightslist = flights;
      if (passengerdetails.value.seatnumber === pid) {
        // tslint:disable-next-line: no-unused-expression
        this.flightslist[fid].passengersDetails[pid] = this.passenger1;
    } else {
      if (passengerdetails.value.seatnumber >= this.flightslist[fid].passengersDetails.length) {
      alert('Invalid Seatnumber');
      } else {
      this.passenger2 = this.flightslist[fid].passengersDetails[passengerdetails.value.seatnumber];
      this.flightslist[fid].passengersDetails[passengerdetails.value.seatnumber] = this.passenger1;
      this.flightslist[fid].passengersDetails[pid] = this.passenger2;
      }
    }
      this.addFlightDetail(this.flightslist).subscribe(() => {
        this.store.dispatch(new formAdmin.GetFlightsActionAdmin(this.flightslist));
        this.store.dispatch(new fromStaff.GetFlightsAction(this.flightslist));
      },
      error => {
        alert('error in updating the details');
        console.log('error in updating the details');
      }
      );
    });
  }

  Addpassenger( passengerdetails: FormGroup, flightId: number) {
    this.passenger1 = new Passenger(passengerdetails.value.name,
      passengerdetails.value.checkIn === 'true' ? true : false,
      passengerdetails.value.wheelChair === 'true' ? true : false,
      passengerdetails.value.infants === 'true' ? true : false,
      new Ancillary([passengerdetails.value.meal], 10),
      passengerdetails.value.address,
      passengerdetails.value.passport);

    this.getAllFlights().subscribe((flights: Flight[]) => {
        this.flightslist = flights;
        this.flightslist[flightId].passengersDetails.push(this.passenger1);
        this.addFlightDetail(this.flightslist).subscribe(() => {
          this.store.dispatch(new formAdmin.GetFlightsActionAdmin(this.flightslist));
        }, error => {
          alert('error in adding the Passenger');
          console.log('error in adding the passsenger');
        });
      });
  }

}
