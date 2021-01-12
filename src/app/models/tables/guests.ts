import { config, DynamoDB } from 'aws-sdk';
import { Table} from '../table-names';
import { ITableHandler } from '../table-handler.interface';
import { createTableCallback } from '../callback';

export class GuestTableHandler implements ITableHandler {

    createTable(): Promise<void> {
        return new Promise(() => {
            config.update({ region: process.env.AWS_REGION });

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

            dynamoDb.createTable(tableParams, createTableCallback);
        });
    }
}