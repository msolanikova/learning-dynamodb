import * as AWS from "aws-sdk";
import {dynamoClient} from "../utils/dynamo-config";
import {Voucher} from "../entities/Voucher";
import {VoucherType} from "../entities/VoucherType";
import {Status} from "../entities/Status";

export class VoucherSearchRepository {
    private documentClient: AWS.DynamoDB.DocumentClient;

    constructor() {
        this.documentClient = dynamoClient();
    }

    getAllVouchers() {
        let params = {
            Select: "ALL_ATTRIBUTES",
            TableName: "vouchers",
            FilterExpression: "itemType = :details",
            ExpressionAttributeValues: {
                ':details': "details"
            }
        };
        return this.documentClient.scan(params).promise();
    }

    getVoucher(uuid: string) {
        let params = {
            Select: "ALL_ATTRIBUTES",
            TableName: "vouchers",
            Key: {
                uuid: uuid,
                itemType: 'details'
            }
        };
        return this.documentClient.get(params).promise()
            .then(data => {
                if(data.Item == null) {
                    throw new Error("Data not found");
                }
                let voucher = data.Item as Voucher;
                return voucher;
            });
    }

    getVouchersByType(voucherType: VoucherType) {
        let params = {
            Select: "ALL_ATTRIBUTES",
            TableName: "vouchers",
            FilterExpression : 'voucherType = :voucherType',
            ExpressionAttributeValues : {
                ':voucherType' : voucherType
            }
        };
        return this.documentClient.scan(params).promise();
    }

    countAllVouchers() {
        let params = {
            Select: "COUNT",
            TableName: "vouchers"
        };
        return this.documentClient.scan(params).promise();
    }

    getVouchersByCode(code: string) {
        let params = {
            Select: "ALL_ATTRIBUTES",
            TableName: "vouchers",
            IndexName: "codes",
            KeyConditionExpression: 'code = :code',
            FilterExpression: 'itemType = :details',
            ExpressionAttributeValues: {
                ':code': code,
                ':details': 'details'
            }
        };
        return this.documentClient.query(params).promise()
            .then(data => {
                if(data.Items.length == 0) {
                    throw new Error(`Could not find voucher with code [${code}]`);
                }
                /*if(data.Items.length > 1) {
                    throw new Error(`More than 1 vouchers found with code [${code}]`);
                }*/
                return data;
            });
    }

    getVouchersByStatusAndSession(status: Status, session: string) {
        let params = {
            Select: "ALL_ATTRIBUTES",
            TableName: "vouchers",
            FilterExpression : 'voucherStatus.sessionId = :ses AND voucherStatus.voucherStatus = :st ',
            ExpressionAttributeValues : {
                ':ses' : session,
                ':st': status
            }
        };

        return this.documentClient.scan(params).promise()
            .then(data => {
                if(data.Items.length == 0) {
                    throw new Error(`Could not find voucher with status ${status} and session ${session}`);
                }
                return data;
            });
    }

}