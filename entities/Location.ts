export class Location {
    locationId: number;
    lineId: string;
    arrayNumber: number;

    constructor(locationId: number, lineId: string, arrayNumber: number) {
        this.locationId = locationId;
        this.lineId = lineId;
        this.arrayNumber = arrayNumber;
    }
}