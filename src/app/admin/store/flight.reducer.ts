import { Flight } from '../../sharedmodels/flight.model';
import * as fromFlightAtctions from './flight.action';
export interface State {
    adminflights: Flight[];
}
// tslint:disable-next-line: one-variable-per-declaration
const initialstate: State = {
    adminflights: []
};
export function AdminFlightReducer(state = initialstate, action: fromFlightAtctions.GetFlightsActionAdmin) {

    switch (action.type) {
        case fromFlightAtctions.AdminGETFlights:
            return {...state, adminflights: [...action.payload]};
            default:
                return state;
    }
}
