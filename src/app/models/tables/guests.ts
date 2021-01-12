import { config, DynamoDB } from 'aws-sdk';
import { Table} from '../table-names';
import { ITableHandler } from '../table-handler.interface';
import { createTableCallback } from '../callback';

export class GuestTableHandler implements ITableHandler {

    createTable(): Promise<void> {
        return new Promise((resolve) => {
            config.update({ region: process.env.AWS_REGION });

            const dynamoDb = new DynamoDB();

            const tableParams: DynamoDB.Types.CreateTableInput = {
                TableName : Table.Guests,
                KeySchema: [
                    { AttributeName: 'id', KeyType: 'HASH'},
                    { AttributeName: 'phone', KeyType: 'RANGE' }
                    //{ AttributeName: 'email', KeyType: 'RANGE' }
                ],
                AttributeDefinitions: [
                    { AttributeName: 'id', AttributeType: 'N' },
                    // { AttributeName: 'firstName', AttributeType: 'S' },
                    // { AttributeName: 'lastName', AttributeType: 'S' },
                    { AttributeName: 'phone', AttributeType: 'S' }
                    //{ AttributeName: 'email', AttributeType: 'S' }
                    // { AttributeName: 'lastAction', AttributeType: 'S' },
                    // { AttributeName: 'created', AttributeType: 'S' },
                    // { AttributeName: 'modified', AttributeType: 'S' },
                    // { AttributeName: 'deleted', AttributeType: 'S' }
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 10,
                    WriteCapacityUnits: 10
                }
            };

            dynamoDb.createTable(tableParams, createTableCallback);
            return resolve();

        });
    }
}