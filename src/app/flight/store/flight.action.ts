import { Flight } from './../../sharedmodels/flight.model';
import { Action } from '@ngrx/store';

export const GETFlights = 'GETFlights';

export class GetFlightsAction implements Action {
    readonly type = GETFlights;
    constructor(public payload: Flight[]) {}
}
