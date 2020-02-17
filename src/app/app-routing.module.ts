import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authservice/auth.guard';


const routes: Routes = [
  {path: '', loadChildren: './home/home.module#HomeModule'},
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: 'flight', loadChildren: './flight/flight.module#FlightModule', canActivate: [AuthGuard], data: {role: 'staff'}},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard], data: {role: 'admin'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
