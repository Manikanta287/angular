import { FlightRoutingModule } from 'src/app/flight/flight-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightComponent } from './flight.component';
import { PassengersListComponent } from './passengers-list/passengers-list.component';
import { AngularMaterialModule } from '../sharedmodules/angular-material/angular-material.module';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PassengerDetailsComponent } from './passenger-details/passenger-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdatePassengerComponent } from './update-passenger/update-passenger.component';


@NgModule({
  declarations: [FlightComponent,
     PassengersListComponent,
     FlightListComponent,
      FlightDetailsComponent,
       PassengerDetailsComponent,
       UpdatePassengerComponent],
  imports: [
    CommonModule,
    FlightRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    PassengerDetailsComponent,
    UpdatePassengerComponent
  ],
})
export class FlightModule { }
