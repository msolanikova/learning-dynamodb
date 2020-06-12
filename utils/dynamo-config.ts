import * as AWS from "aws-sdk";

AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'local'});
AWS.config.region = 'us-east-1';

export function dynamoClient() {
    return new AWS.DynamoDB.DocumentClient({endpoint: "http://localhost:8000"});
}

export function dynamoDB() {
    return new AWS.DynamoDB({
        endpoint: "http://localhost:8000",
        httpOptions: {
            connectTimeout: 10000,
            timeout: 10000
        }
    });
}