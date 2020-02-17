import { Flight } from '../../sharedmodels/flight.model';
import * as fromFlightAtctions from './flight.action';
export interface State {
    flights: Flight[];
}
// tslint:disable-next-line: one-variable-per-declaration
const initialstate: State = {
    flights: []
};
export function FlightReducer(state = initialstate, action: fromFlightAtctions.GetFlightsAction) {

    switch (action.type) {
        case fromFlightAtctions.GETFlights:
            return {...state, flights: [...action.payload]};
            default:
                return state;
    }
}
