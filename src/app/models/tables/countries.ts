import { config, DynamoDB } from 'aws-sdk';
import { Table} from '../table-names';
import { ITableHandler } from '../table-handler.interface';
import { createTableCallback } from '../callback';

export class CountriesTableHandler implements ITableHandler {

    createTable(): Promise<void> {
        return new Promise((resolve) => {
            config.update({ region: process.env.AWS_REGION });

            const dynamoDb = new DynamoDB();

            const tableParams: DynamoDB.Types.CreateTableInput = {
                TableName : Table.Countries,
                KeySchema: [
                    { AttributeName: 'id', KeyType: 'HASH'},
                    { AttributeName: 'name', KeyType: 'RANGE' }

                ],
                AttributeDefinitions: [
                    { AttributeName: 'id', AttributeType: 'N' },
                    { AttributeName: 'name', AttributeType: 'S' }
                    // { AttributeName: 'niceName', AttributeType: 'S' },
                    // { AttributeName: 'phoneCode', AttributeType: 'N' }
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