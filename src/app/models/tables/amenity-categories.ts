import { config, DynamoDB } from 'aws-sdk';
import { Table} from '../table-names';
import { ITableHandler } from '../table-handler.interface';
import { createTableCallback } from '../callback';

export class AmenityCategoriesTableHandler implements ITableHandler {

    createTable(): Promise<void> {
        return new Promise((resolve) => {
            config.update({ region: process.env.AWS_REGION });

            const dynamoDb = new DynamoDB();

            const tableParams: DynamoDB.Types.CreateTableInput = {
                TableName : Table.AmenityCategories,
                KeySchema: [
                    { AttributeName: 'id', KeyType: 'HASH'},
                    { AttributeName: 'title', KeyType: 'RANGE' }
                ],
                AttributeDefinitions: [
                    { AttributeName: 'id', AttributeType: 'N' },
                    { AttributeName: 'title', AttributeType: 'S' }
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