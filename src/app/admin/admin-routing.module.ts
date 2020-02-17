import { PassengerListComponent } from './passenger-list/passenger-list.component';

import { AdminComponent } from './admin.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightListComponent } from './flight-list/flight-list.component';


const routes: Routes = [
  {path: '', component: AdminComponent, children: [
    {path: '', component: FlightListComponent},
    {path: 'passengerlist/:id', component: PassengerListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
