import {VoucherType} from "./VoucherType";
import {VoucherStatus} from "./VoucherStatus";

export class Voucher {
    uuid: string;
    code: string;
    itemType: string;
    voucherType: VoucherType;
    validityStart: number;
    validityEnd: number;
    voucherStatus: VoucherStatus;
    createTimestamp: number;
    updateTimestamp: number;

    constructor(uuid: string, code: string, voucherType: VoucherType, validityStart: number, validityEnd: number, voucherStatus: VoucherStatus, createTimestamp: number, updateTimestamp: number) {
        this.uuid = uuid;
        this.code = code;
        this.itemType = "details";
        this.voucherType = voucherType;
        this.validityStart = validityStart;
        this.validityEnd = validityEnd;
        this.voucherStatus = voucherStatus;
        this.createTimestamp = createTimestamp;
        this.updateTimestamp = updateTimestamp;
    }

    public toString = () : string => {
        return `Voucher (uiud = ${this.uuid},\n  voucherType = ${this.voucherType},\n  voucherStatus = ${this.voucherStatus}, \n updateTimestamp = ${this.updateTimestamp})`;
    }

}