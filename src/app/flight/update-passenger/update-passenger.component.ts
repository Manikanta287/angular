import { DatabaseService } from './../../sharedservices/database.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Passenger, Ancillary } from './../../sharedmodels/passengers.model';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-passenger',
  templateUrl: './update-passenger.component.html',
  styleUrls: ['./update-passenger.component.css']
})
export class UpdatePassengerComponent implements OnInit {

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
