"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const region = 'ap-south-1';
// const dynamoDB = new DynamoDB({ region })
const docClient = lib_dynamodb_1.DynamoDBDocument.from(new client_dynamodb_1.DynamoDB({ region }));
// dynamoDB.listTables({}, (err, data) => {
//     if (data) {
//         console.log(data.TableNames)
//     } else {
//         console.log(err)
//     }
// })
// console.log('Notes Description')
// console.log()
// dynamoDB.describeTable({ TableName: 'notes' }, (err, data) => {
//     if (data) {
//         console.log(data.Table)
//     } else {
//         console.log(err)
//     }
// })
// dynamoDB.createTable({
//     TableName: 'notes_SDK',
//     AttributeDefinitions: [
//         { AttributeName: 'user_id', AttributeType: 'S' },
//         { AttributeName: 'timestamp', AttributeType: 'N' },
//     ],
//     KeySchema: [
//         { AttributeName: 'user_id', KeyType: 'HASH' },
//         { AttributeName: 'timestamp', KeyType: 'RANGE' }
//     ],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 1,
//         WriteCapacityUnits: 1
//     }
// }, (err, table) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(table)
//     }
// })
//////////////////////////////////////
// docClient.put({
//     TableName: 'notes_SDK', Item: {
//         user_id: 'cefd32cds',
//         timestamp: Date.now(),
//         cat: 'DBMS',
//         content: `This is sample content of a note.`,
//         note_id: Math.floor(Date.now() * Math.random()),
//         title: 'Company DB in MySQL',
//         username: 'sushant102004'
//     }
// }, (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data)
//     }
// })
// Conditional Write Operations
const putParams = {
    TableName: 'notes_SDK',
    Item: {
        user_id: 'cefd32cds',
        timestamp: Date.now(),
        cat: 'DAA',
        content: `This is sample content of a note.`,
        note_id: '1150578655767',
        title: 'DAA Notes',
        username: 'sushant102004'
    },
    /*
        ConditionExpression will return true if item with same note_id is already present.
        Then it will reject the put request.
    */
    ConditionExpression: 'note_id = :expectedValue',
    ExpressionAttributeValues: {
        ':expectedValue': '1150578655767'
    }
};
// docClient.put(putParams, (err, result) => {
//     if (err) {
//         console.log('Element with same note_id is already present.')
//         return
//     } else {
//         console.log(result?.Attributes)
//     }
// })
// docClient.get({ TableName: 'notes_SDK', Key: { user_id: 'cefd32cds', timestamp: 1686569716618 }
// }, (err, result) => {
//     if(err) {
//         console.log(err)
//         return
//     } else {
//         console.log(result?.Item)
//     }
// })
// Querying Data
// docClient.query({
//     TableName: 'notes_SDK',
//     KeyConditionExpression: 'user_id = :user_id',
//     ExpressionAttributeValues: {
//         ':user_id': 'cefd32cds'
//     }
// }, (err, result) => {
//     if(err) console.log(err)
//     else console.log(result?.Items)
// })
