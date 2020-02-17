import { Passenger } from './../../sharedmodels/passengers.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PassengerDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: Passenger) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
