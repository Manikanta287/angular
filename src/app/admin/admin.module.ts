import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AngularMaterialModule } from '../sharedmodules/angular-material/angular-material.module';
import { FlightListComponent } from './flight-list/flight-list.component';
import { PassengerListComponent } from './passenger-list/passenger-list.component';
import { UpdatePassengerDetailsComponent } from './update-passenger-details/update-passenger-details.component';
import { AddpassengerComponent } from './addpassenger/addpassenger.component';



@NgModule({
  declarations: [AdminComponent,
    FlightListComponent,
    PassengerListComponent,
    UpdatePassengerDetailsComponent,
    AddpassengerComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [ UpdatePassengerDetailsComponent,
    AddpassengerComponent]
})
export class AdminModule { }
