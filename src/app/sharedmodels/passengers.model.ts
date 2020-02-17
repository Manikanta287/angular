export class Passenger {
    passengername: string;
    checkedInStatus: boolean;
    requirewheelChair: boolean;
    withInfants: boolean;
    ancillaryservices: Ancillary;
    passportNumber: string;
    Address: string;


    constructor(passengername: string,
                checkedInStatus: boolean,
                requirewheelChair: boolean,
                withInfants: boolean,
                ancillaryservices: Ancillary,
                address: string,
                passportnumber: string) {

            this.passengername = passengername;
            this.checkedInStatus = checkedInStatus;
            this.requirewheelChair = requirewheelChair;
            this.withInfants = withInfants;
            this.ancillaryservices = ancillaryservices;
            this.Address = address;
            this.passportNumber = passportnumber;

    }
}

export class Ancillary {
    meal: string[];
    additionalbaggage: number;

    constructor(meal: string[], additionalbaggage: number) {
        this.meal = meal;
        this.additionalbaggage = additionalbaggage;
    }
}
