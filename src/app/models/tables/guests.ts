import { AWSError, config, DynamoDB } from 'aws-sdk';
import { Table} from '../table-names';
import { ITableHandler } from '../table-handler.interface';

export class GuestTableHandler implements ITableHandler {

    createTable(): void {
        config.update({
            region: process.env.AWS_REGION
        });

        const dynamoDb = new DynamoDB();

        const tableParams: DynamoDB.Types.CreateTableInput = {
            TableName : Table.Guests,
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
                console.error(`Unable to create table. Error JSON: ${err.message}`);
            } else {
                console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
            }
        }

        dynamoDb.createTable(tableParams, callback);
    }
}


