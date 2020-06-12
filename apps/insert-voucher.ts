import {VoucherCreateUpdateRepository} from '../repositories/VoucherCreateUpdateRepository'
import {uuid} from 'uuidv4';
import {logger} from "../utils/logger";
import {Device} from "../entities/Device";

const log = logger(__filename);

let voucherRepository = new VoucherCreateUpdateRepository();

for (let i = 0; i < 100; i++) {
    voucherRepository.createProductVoucher(uuid(), uuid(), "insitution1", "orderReference1", "itemReference1", "itemInstance1", Date.now(), addDays(new Date(), 5).getTime(), "catalogueItemId")
        .then(data => {
            log.info(`${i}: product voucher ${data['voucher'].uuid} created`);
            return voucherRepository.issueVoucher(data['voucher'], new Device("device1", "eq333", "EQ333", "operator 01"),
                "session1", "changedBy1", null, "Voucher issued");
        })
        .then(data => {
            log.info(`${i}: product voucher ${data['voucher'].uuid} issued`);
        })
        .catch(err => {
            log.error(err.stack);
        });

    voucherRepository.createCashableVoucher(uuid(), uuid(), Date.now(), addDays(new Date(), 365).getTime(), Math.round(Math.random() * 10), null)
        .then(data => {
            log.info(`${i}: cashable voucher ${data['voucher'].uuid} created`);
            return voucherRepository.issueVoucher(data['voucher'], new Device("device1", "eq333", "EQ333", "operator 01"),
                "session1", "changedBy1", null, "Voucher issued");
        })
        .then(data => {
            log.info(`${i}: cashable voucher ${data['voucher'].uuid} issued`);
        })
        .catch(err => {
            log.error(err.stack);
        });

    voucherRepository.createCreditVoucher(uuid(), uuid(), Date.now(), addDays(new Date(), 365).getTime(), Math.round(Math.random() * 100), null)
        .then(data => {
            log.info(`${i}: credit voucher ${data['voucher'].uuid} created`);
            return voucherRepository.issueVoucher(data['voucher'], new Device("device1", "eq333", "EQ333", "operator 01"),
                "session1", "changedBy1", null, "Voucher issued");
        })
        .then(data => {
            log.info(`${i}: credit voucher ${data['voucher'].uuid} issued`);
        })
        .catch(err => {
            log.error(err.stack);
        });
}
for (let i = 0; i < 100; i++) {
    voucherRepository.createProductVoucher(uuid(), uuid(), "insitution1", "orderReference1", "itemReference1", "itemInstance1", Date.now(), addDays(new Date(), 5).getTime(), "catalogueItemId")
        .then(data => {
            log.info(`${i}: product voucher ${data['voucher'].uuid} created`);
            return voucherRepository.issueVoucher(data['voucher'], new Device("device1", "eq333", "EQ333", "operator 01"),
                "session1", "changedBy1", null, "Voucher issued");
        })
        .then(data => {
            log.info(`${i}: product voucher ${data['voucher'].uuid} issued`);
            return voucherRepository.reserveVoucher(data['voucher'], new Device("device2", "eq334", "EQ334", "operator 01"),
                "session2", "changedBy2", null, "reserved for redemption");
        })
        .then(data => {
            log.info(`${i}: product voucher ${data['voucher'].uuid} reserved`);
            return voucherRepository.redeemProductVoucher(data['voucher'], new Device("device2", "eq334", "EQ334", "operator 01"),
                "session2", "changedBy2", null, "redemption");
        })
        .then(data => {
            log.info(`${i}: product voucher ${data['voucher'].uuid} redeemed`);
        })
        .catch(err => {
            log.error(err.stack);
        });

    voucherRepository.createCashableVoucher(uuid(), uuid(), Date.now(), addDays(new Date(), 365).getTime(), Math.round(Math.random() * 10), null)
        .then(data => {
            log.info(`${i}: cashable voucher ${data['voucher'].uuid} created`);
            return voucherRepository.issueVoucher(data['voucher'], new Device("device1", "eq333", "EQ333", "operator 01"), "session1", "changedBy1", null, "Voucher issued");
        })
        .then(data => {
            log.info(`${i}: cashable voucher ${data['voucher'].uuid} issued`);
            return voucherRepository.reserveVoucher(data['voucher'], new Device("device2", "eq334", "EQ334", "operator 01"),
                "session2", "changedBy2", null, "reserved for redemption");
        })
        .then(data => {
            log.info(`${i}: cashable voucher ${data['voucher'].uuid} reserved`);
            return voucherRepository.redeemCashableVoucher(data['voucher'], new Device("device2", "eq334", "EQ334", "operator 01"),
                "session2", data['voucher'].amount, "changedBy2", null, "redemption");
        })
        .then(data => {
            log.info(`${i}: cashable voucher ${data['voucher'].uuid} redeemed`);
        })
        .catch(err => {
            log.error(err.stack);
        });

    voucherRepository.createCreditVoucher(uuid(), uuid(), Date.now(), addDays(new Date(), 365).getTime(), Math.round(Math.random() * 100), null)
        .then(data => {
            log.info(`${i}: credit voucher ${data['voucher'].uuid} created`);
            return voucherRepository.issueVoucher(data['voucher'], new Device("device1", "eq333", "EQ333", "operator 01"),
                "session1", "changedBy1", null, "Voucher issued");
        })
        .then(data => {
            log.info(`${i}: credit voucher ${data['voucher'].uuid} issued`);
            return voucherRepository.reserveVoucher(data['voucher'], new Device("device2", "eq334", "EQ334", "operator 01"),
                "session2", "changedBy2", null, "reserved for redemption");
        })
        .then(data => {
            log.info(`${i}: credit voucher ${data['voucher'].uuid} reserved`);
            return voucherRepository.redeemCreditVoucher(data['voucher'], new Device("device2", "eq334", "EQ334", "operator 01"),
                "session2", data['voucher'].amount, "changedBy2", null, "redemption");
        })
        .then(data => {
            log.info(`${i}: credit voucher ${data['voucher'].uuid} redeemed`);
        })
        .catch(err => {
            log.error(err.stack);
        });
}

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}