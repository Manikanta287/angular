import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { PassengersListComponent } from './passengers-list/passengers-list.component';
import { FlightComponent } from './flight.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: FlightComponent, children: [
    {path: '', component: FlightListComponent},
    {path: 'flights', component: FlightListComponent},
    {path: 'passengers/:id2', component: PassengersListComponent},
    {path: 'flightdetails/:id', component: FlightDetailsComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
