import { Flight } from './../../sharedmodels/flight.model';
import { Action } from '@ngrx/store';

export const AdminGETFlights = 'AdminGETFlights';

export class GetFlightsActionAdmin implements Action {
    readonly type = AdminGETFlights;
    constructor(public payload: Flight[]) {}
}
