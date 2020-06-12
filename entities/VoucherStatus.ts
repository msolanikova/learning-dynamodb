import {Status} from "./Status";
import {Device} from "./Device";
import {Location} from "./Location";
import {Service} from "./Service";

export class VoucherStatus {

    voucherStatus: Status;
    sessionId: string;
    amount: number;
    device: Device;
    location: Location;
    service: Service;
    reason: string;
    transactionId: string;
    updateTimestamp: number;

    constructor(voucherStatus: Status, sessionId: string, amount: number, device: Device, location: Location, service: Service, reason: string, transactionId: string, updateTimestamp: number) {
        this.voucherStatus = voucherStatus;
        this.sessionId = sessionId;
        this.amount = amount;
        this.device = device;
        this.location = location;
        this.service = service;
        this.reason = reason;
        this.transactionId = transactionId;
        this.updateTimestamp = updateTimestamp;
    }
}