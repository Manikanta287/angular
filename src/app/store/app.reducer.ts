
import * as fromFlights from '../flight/store/flight.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromAdminFlights from '../admin/store/flight.reducer';
import * as fromHome from '../home/store/home.reducer';


export interface AppState {
    flights: fromFlights.State;
    adminflights: fromAdminFlights.State;
    login: fromHome.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    flights: fromFlights.FlightReducer,
    adminflights: fromAdminFlights.AdminFlightReducer,
    login: fromHome.homeReducer
};

