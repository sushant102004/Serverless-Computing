import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

const region = 'ap-south-1'

// const dynamoDB = new DynamoDB({ region })

const docClient = DynamoDBDocument.from(new DynamoDB({ region }))

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

docClient.put({
    TableName: 'notes_SDK', Item: {
        user_id: 'cefd32cds',
        timestamp: Date.now(),
        cat: 'DBMS',
        content: `This is sample content of a note.`,
        note_id: Math.floor(Date.now() * Math.random()),
        title: 'Company DB in MySQL',
        username: 'sushant102004'
    }
}, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})
