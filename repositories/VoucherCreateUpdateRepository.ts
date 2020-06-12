import * as AWS from 'aws-sdk';
import {ProductVoucher} from '../entities/ProductVoucher';
import {Status} from "../entities/Status";
import {Voucher} from "../entities/Voucher";
import {VoucherStatusRevision} from "../entities/VoucherStatusRevision";
import {CreditVoucher} from "../entities/CreditVoucher";
import {CashableVoucher} from "../entities/CashableVoucher";
import {Device} from "../entities/Device";
import {Location} from "../entities/Location";
import {Service} from "../entities/Service";
import {dynamoClient} from "../utils/dynamo-config";
import {VoucherStatus} from "../entities/VoucherStatus";

export class VoucherCreateUpdateRepository {

    private documentClient: AWS.DynamoDB.DocumentClient;

    constructor() {
        this.documentClient = dynamoClient();
    }

    createProductVoucher(voucherUuid: string, code: string, institutionId: string, orderReference: string, itemReference: string, itemInstance: string, validityStart: number, validityEnd: number, catalogueItemId: string) {
        let status = new VoucherStatus(Status.CREATED, "sessionId1", null,
            new Device("device123", "equipmentName", "shortEqName", "operator 01"),
            new Location(14, "15", 1), new Service(1, "STIB", new Date().toISOString()),
            "voucher created", null, Date.now());
        let revisionItemCreated = new VoucherStatusRevision(voucherUuid, status);
        let productVoucher = new ProductVoucher(voucherUuid, code, validityStart, validityEnd, status, Date.now(),
            Date.now(), institutionId, orderReference, itemReference, itemInstance, catalogueItemId);

        return this.createVoucher(productVoucher, revisionItemCreated);
    }

    createCashableVoucher(voucherUuid: string, code: string, validityStart: number, validityEnd: number, amount: number, parentVoucher: CashableVoucher) {
        let status = new VoucherStatus(Status.CREATED, "sessionId1", null,
            new Device("device123", "equipmentName", "shortEqName", "operator 01"),
            new Location(14, "15", 1), new Service(1, "STIB", new Date().toISOString()),
            "voucher created", null, Date.now());
        let revisionItemCreated = new VoucherStatusRevision(voucherUuid, status);
        let voucher = new CashableVoucher(voucherUuid, code, validityStart, validityEnd, status, Date.now(), Date.now(), amount, parentVoucher)

        return this.createVoucher(voucher, revisionItemCreated);
    }

    createCreditVoucher(voucherUuid: string, code: string, validityStart: number, validityEnd: number, amount: number, parentVoucher: CreditVoucher) {
        let status = new VoucherStatus(Status.CREATED, "sessionId1", null,
            new Device("device123", "equipmentName", "shortEqName", "operator 01"),
            new Location(14, "15", 1), new Service(1, "STIB", new Date().toISOString()),
            "voucher created", null, Date.now());
        let revisionItemCreated = new VoucherStatusRevision(voucherUuid, status);
        let voucher = new CreditVoucher(voucherUuid, code, validityStart, validityEnd, status, Date.now(), Date.now(), amount, parentVoucher)

        return this.createVoucher(voucher, revisionItemCreated);
    }

    private createVoucher(voucher: Voucher, revision: VoucherStatusRevision) {
        let paramsVoucherDetails = {
            TableName: 'vouchers',
            Item: voucher,
            ReturnValues: "ALL_OLD"
        };

        let paramsVoucherStatusRevision = {
            TableName: 'vouchers',
            Item: revision,
            ReturnValues: "ALL_OLD"
        }

        return this.documentClient.put(paramsVoucherDetails).promise()
            .then(() => this.documentClient.put(paramsVoucherStatusRevision).promise())
            .then(data => {
                data['voucher'] = voucher;
                return data;
            });
    }

    issueVoucher(voucher: Voucher, device: Device, sessionId: string, changedBy: string, transactionId: string, reason: string) {
        return this.changeVoucherStatus(voucher, Status.ISSUED, device, new Location(1, "1", 1),
            new Service(1, "STIB", new Date().toISOString()), sessionId, null, changedBy, transactionId, reason);
    }

    reserveVoucher(voucher: Voucher, device: Device, sessionId: string, changedBy: string, transactionId: string, reason: string) {
        return this.changeVoucherStatus(voucher, Status.RESERVED, device, new Location(1, "1", 1),
            new Service(1, "STIB", new Date().toISOString()), sessionId, null, changedBy, transactionId, reason);
    }

    redeemCashableVoucher(voucher: CashableVoucher, device: Device, sessionId: string, amount: number, changedBy: string, transactionId: string, reason: string) {
        return this.changeVoucherStatus(voucher, Status.REDEEMED, device, new Location(1, "1", 1),
            new Service(1, "STIB", new Date().toISOString()), sessionId, amount, changedBy, transactionId, reason);
    }

    redeemCreditVoucher(voucher: CreditVoucher, device: Device, sessionId: string, amount: number, changedBy: string, transactionId: string, reason: string) {
        return this.changeVoucherStatus(voucher, Status.REDEEMED, device, new Location(1, "1", 1),
            new Service(1, "STIB", new Date().toISOString()), sessionId, amount, changedBy, transactionId, reason);
    }

    redeemProductVoucher(voucher: ProductVoucher, device: Device, sessionId: string, changedBy: string, transactionId: string, reason: string) {
        return this.changeVoucherStatus(voucher, Status.REDEEMED, device, new Location(1, "1", 1),
            new Service(1, "STIB", new Date().toISOString()), sessionId, null, changedBy, transactionId, reason);
    }

    cancelVoucher(voucher: Voucher, device: Device, sessionId: string, changedBy: string, transactionId: string, reason: string) {
        return this.changeVoucherStatus(voucher, Status.CANCELLED, device, new Location(1, "1", 1),
            new Service(1, "STIB", new Date().toISOString()), sessionId, null, changedBy, transactionId, reason);
    }

    changeVoucherStatus(voucher: Voucher, voucherStatus: Status, device: Device, location: Location, service: Service, sessionId: string, amount: number, changedBy: string, transactionId: string, reason: string) {

        let newStatus = new VoucherStatus(voucherStatus, sessionId, amount, device, location, service, reason, transactionId, Date.now());
        let newStatusRevisionItem = new VoucherStatusRevision(voucher.uuid, newStatus);

        let updateVoucherParams = {
            TableName: 'vouchers',
            Key: {
                uuid: voucher.uuid,
                itemType: 'details'
            },
            UpdateExpression: "SET #voucherStatus = :voucherStatus, #updateTimestamp = :updateTimestamp",
            ExpressionAttributeNames : {
                '#voucherStatus' : 'voucherStatus',
                '#updateTimestamp': 'updateTimestamp'
            },
            ExpressionAttributeValues: {
                ':voucherStatus': newStatus,
                ':updateTimestamp': Date.now()
            },
        };

        let newStatusRevisionParams = {
            TableName: 'vouchers',
            Item: newStatusRevisionItem,
            ReturnValues: "ALL_OLD"
        };

        return this.documentClient.update(updateVoucherParams).promise()
            .then(() => {
                voucher.voucherStatus = newStatus;
                return this.documentClient.put(newStatusRevisionParams).promise()
            })
            .then(data => {
                data['voucher'] = voucher;
                return data;
            });
    }

}