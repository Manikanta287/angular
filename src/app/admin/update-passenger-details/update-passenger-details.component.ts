import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdatePassengerComponent } from 'src/app/flight/update-passenger/update-passenger.component';
import { DatabaseService } from 'src/app/sharedservices/database.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-passenger-details',
  templateUrl: './update-passenger-details.component.html',
  styleUrls: ['./update-passenger-details.component.css']
})
export class UpdatePassengerDetailsComponent implements OnInit {

  passengerId: number; // Index in the Array
  flightId: number;
  constructor(private dialogRef: MatDialogRef<UpdatePassengerComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
              private datastorageservice: DatabaseService) { }

  Passenger = new FormGroup({
    seatnumber: new FormControl(''),
    name: new FormControl(''),
    checkIn: new FormControl(''),
    wheelChair: new FormControl(''),
    infants: new FormControl(''),
    address: new FormControl(''),
    passport: new FormControl(''),
    meal: new FormControl(''),
    baggage: new FormControl('')

  });

  ngOnInit() {
    this.passengerId = this.data.Index;
    this.flightId = this.data.flightId;
    this.Passenger.setValue({name: this.data.User.passengername,
      seatnumber: this.data.Index,
      checkIn: this.data.User.checkedInStatus ? 'true' : 'false',
      wheelChair: this.data.User.requirewheelChair ? 'true' : 'false',
    infants: this.data.User.withInfants ? 'true' : 'false',
  address: this.data.User.Address,
  passport: this.data.User.passportNumber,
  meal: this.data.User.ancillaryservices.meal,
  baggage: this.data.User.ancillaryservices.additionalbaggage});
  }

  cancel() {
    this.dialogRef.close();
  }

  update() {
    this.datastorageservice.updatePassegerDetails(this.Passenger, this.passengerId, this.flightId);
    this.cancel();
  }
}
