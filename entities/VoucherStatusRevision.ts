import {VoucherStatus} from "./VoucherStatus";

export class VoucherStatusRevision {

    uuid: string;
    itemType: string;
    voucherStatus: VoucherStatus;

    constructor(uuid: string, voucherStatus: VoucherStatus) {
        this.uuid = uuid;
        this.itemType = Date.now().toString();
        this.voucherStatus = voucherStatus;
    }
}