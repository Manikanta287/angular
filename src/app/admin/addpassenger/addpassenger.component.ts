import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdatePassengerComponent } from 'src/app/flight/update-passenger/update-passenger.component';
import { DatabaseService } from 'src/app/sharedservices/database.service';
import { FormGroup, FormControl } from '@angular/forms';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-addpassenger',
  templateUrl: './addpassenger.component.html',
  styleUrls: ['./addpassenger.component.css']
})
export class AddpassengerComponent implements OnInit {

  passengerId: number; // Index in the Array
  flightId: number;
  constructor(private dialogRef: MatDialogRef<UpdatePassengerComponent>,
              private datastorageservice: DatabaseService,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

  Passenger = new FormGroup({

    name: new FormControl(''),
    checkIn: new FormControl('false'),
    wheelChair: new FormControl('false'),
    infants: new FormControl('false'),
    address: new FormControl(''),
    passport: new FormControl(''),
    meal: new FormControl(''),
    baggage: new FormControl('')

  });

  ngOnInit() {
    this.flightId = this.data.flightId;
  }

  cancel() {
    this.dialogRef.close();
  }

  Add() {
    this.datastorageservice.Addpassenger(this.Passenger, this.flightId);
    this.cancel();
  }
}
