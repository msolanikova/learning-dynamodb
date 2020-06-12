import {Voucher} from "./Voucher";
import {VoucherType} from "./VoucherType";
import {VoucherStatus} from "./VoucherStatus";

export class CreditVoucher extends Voucher{

    parentVoucher: CreditVoucher;
    amount: number;

    constructor(uuid: string, code: string, validityStart: number, validityEnd: number, status: VoucherStatus, createTimestamp: number,
                updateTimestamp: number, amount: number, parentVoucher: CreditVoucher) {
        super(uuid, code, VoucherType.CASHABLE, validityStart, validityEnd, status, createTimestamp, updateTimestamp);
        this.amount = amount;
        this.parentVoucher = parentVoucher;
    }

}
