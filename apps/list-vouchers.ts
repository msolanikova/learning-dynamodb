import {logger} from "../utils/logger";
import {VoucherSearchRepository} from "../repositories/VoucherSearchRepository";
import {Status} from "../entities/Status";

const log = logger(__filename);

let voucherRepository = new VoucherSearchRepository();

/*voucherRepository.getAllVouchers()
    .then(data => {
        log.info(`all vouchers: ${JSON.stringify(data)}`);
    })
    .catch(err => {
        log.error(err.stack);
    });*/

voucherRepository.getVoucher("a19d37d2-5b92-4dbd-8c97-4863467acfd5")
    .then(data => {
        log.info(`voucher from DB: ${JSON.stringify(data)}`);
    })
    .catch(err => {
        log.error(err.stack);
    });

/*voucherRepository.getVouchersByCode("c5cc117b-980d-4eef-ac6e-40dc67b970ea")
    .then(data => {
        log.info(JSON.stringify(data));
    })
    .catch(err => {
        log.error(err);
    });*/

/*voucherRepository.countAllVouchers()
    .then(data => {
        log.info(JSON.stringify(data));
    })
    .catch(err => {
        log.error(err);
    });*/

/*voucherRepository.getVouchersByType(VoucherType.CASHABLE)
    .then(data => {
        for(let voucher of data.Items) {
            console.log(voucher);
        }
    })
    .catch(err => {
        log.error(err);
    });*/

voucherRepository.getVouchersByStatusAndSession(Status.RESERVED, "session2")
    .then(data => {
        log.info(`voucher from DB: ${JSON.stringify(data)}`);
    })
    .catch(err => {
        log.error(err);
    });
