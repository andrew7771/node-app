import { AWSError, config, DynamoDB } from 'aws-sdk';

export function createTable(): void {
    config.update({
        region: 'us-east-2'
    });

    const dynamoDb = new DynamoDB();

    const tableParams: DynamoDB.Types.CreateTableInput = {
        TableName : 'Guests',
        KeySchema: [
            { AttributeName: 'year', KeyType: 'HASH'},
            { AttributeName: 'title', KeyType: 'RANGE' }
        ],
        AttributeDefinitions: [
            { AttributeName: 'year', AttributeType: 'N' },
            { AttributeName: 'title', AttributeType: 'S' }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    };

    function callback(err: AWSError, data: DynamoDB.CreateTableOutput) {
        if (err) {
            console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
        }
    }

    dynamoDb.createTable(tableParams, callback);
}
