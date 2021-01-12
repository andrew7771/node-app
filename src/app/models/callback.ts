import { AWSError, DynamoDB } from 'aws-sdk';

export function createTableCallback(err: AWSError, data: DynamoDB.CreateTableOutput): void {
    if (err) {
        console.error(`Unable to create table. Error: ${err.message}`);
    } else {
        console.log(`Created table. Table description JSON: ${data.TableDescription?.TableName || ''}`);
        // console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
    }
}
