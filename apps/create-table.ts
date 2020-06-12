import * as AWS from 'aws-sdk';
import {logger} from "../utils/logger";
import {dynamoDB} from "../utils/dynamo-config";

const log = logger(__filename);
const dynamo = dynamoDB();

let deleteTableParams = {
    TableName: "vouchers"
}

let createTableParams = {
    "AttributeDefinitions": [
        {
            "AttributeName": "uuid",
            "AttributeType": "S"
        },
        {
            "AttributeName": "itemType",
            "AttributeType": "S"
        },
        {
            "AttributeName": "code",
            "AttributeType": "S"
        },
        {
            "AttributeName": "sessionId",
            "AttributeType": "S"
        }
    ],
    "KeySchema": [
        {
            "AttributeName": "uuid",
            "KeyType": "HASH"
        },
        {
            "AttributeName": "itemType",
            "KeyType": "RANGE"
        }
    ],
    "BillingMode": "PAY_PER_REQUEST",
    "TableName": "vouchers",
    "GlobalSecondaryIndexes": [
        {
            "IndexName": "codes",
            "KeySchema": [
                {
                    "AttributeName": "code",
                    "KeyType": "HASH"
                },
                {
                    "AttributeName": "uuid",
                    "KeyType": "RANGE"
                }
            ],
            "Projection": {
                "ProjectionType": "ALL"
            }
        },
        {
            "IndexName": "sessions",
            "KeySchema": [
                {
                    "AttributeName": "sessionId",
                    "KeyType": "HASH"
                },
                {
                    "AttributeName": "uuid",
                    "KeyType": "RANGE"
                }
            ],
            "Projection": {
                "ProjectionType": "ALL"
            }
        }
    ]
};

async function recreateTable() {
    let deleteTableData = await dynamo.deleteTable(deleteTableParams).promise()
        .catch(err => {
            log.error(err, err.stack);
        });
    log.info(JSON.stringify(deleteTableData));

    let createTableData = await dynamo.createTable(createTableParams).promise()
        .catch(err => {
            console.log(err, err.stack);
        });
    log.info(JSON.stringify(createTableData));
};

recreateTable();