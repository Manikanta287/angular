import { Passenger } from './passengers.model';
export class Flight {
    airlines: string;
    scheduledtime: Date;
    passengersDetails: Passenger[];

    constructor(airlines: string, scheduledtime: Date, passengersDetails: Passenger[]) {
        this.airlines = airlines;
        this.scheduledtime = scheduledtime;
        this.passengersDetails = passengersDetails;
    }
}
