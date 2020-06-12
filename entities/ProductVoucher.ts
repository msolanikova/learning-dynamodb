import {Voucher} from "./Voucher";
import {VoucherType} from "./VoucherType";
import {VoucherStatus} from "./VoucherStatus";

export class ProductVoucher extends Voucher {

    institutionId: string;
    orderReference: string;
    itemReference: string;
    itemInstance: string;
    catalogueItemId: string;

    constructor(uuid: string, code: string, validityStart: number, validityEnd: number, status: VoucherStatus, createTimestamp: number,
                updateTimestamp: number, institutionId: string, orderReference: string, itemReference: string, itemInstance: string, catalogueItemId: string) {
        super(uuid, code, VoucherType.PRODUCT, validityStart, validityEnd, status, createTimestamp, updateTimestamp);
        this.institutionId = institutionId;
        this.orderReference = orderReference;
        this.itemReference = itemReference;
        this.itemInstance = itemInstance;
        this.catalogueItemId = catalogueItemId;
    }
}