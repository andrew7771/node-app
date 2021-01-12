import { config, DynamoDB } from 'aws-sdk';
import { Table} from '../table-names';
import { ITableHandler } from '../table-handler.interface';
import { createTableCallback } from '../callback';

export class HotelsTableHandler implements ITableHandler {

    createTable(): Promise<void> {
        return new Promise((resolve) => {
            config.update({ region: process.env.AWS_REGION });

            const dynamoDb = new DynamoDB();

            const tableParams: DynamoDB.Types.CreateTableInput = {
                TableName : Table.Hotels,
                KeySchema: [
                    { AttributeName: 'id', KeyType: 'HASH'},
                    { AttributeName: 'name', KeyType: 'RANGE' }

                ],
                AttributeDefinitions: [
                    { AttributeName: 'id', AttributeType: 'N' },
                    // { AttributeName: 'hotelCode', AttributeType: 'S' },
                    // { AttributeName: 'appId', AttributeType: 'N' },
                    // { AttributeName: 'lockVendorId', AttributeType: 'N' },
                    // { AttributeName: 'lockVendorModelId', AttributeType: 'N' },
                    // { AttributeName: 'pmsTypeId', AttributeType: 'N' },
                    // { AttributeName: 'countryId', AttributeType: 'N' },
                    // { AttributeName: 'messengerId', AttributeType: 'N' },
                    // { AttributeName: 'state', AttributeType: 'S' },
                    { AttributeName: 'name', AttributeType: 'S' }
                    // { AttributeName: 'city', AttributeType: 'S' },
                    // { AttributeName: 'nearbyCities', AttributeType: 'S' },
                    // { AttributeName: 'address', AttributeType: 'S' },
                    // { AttributeName: 'timezone', AttributeType: 'S' },
                    // { AttributeName: 'checkIn', AttributeType: 'S' },
                    // { AttributeName: 'checkOut', AttributeType: 'S' },
                    // { AttributeName: 'wifi', AttributeType: 'S' },
                    // { AttributeName: 'logoUrl', AttributeType: 'S' },
                    // { AttributeName: 'bookingUrl', AttributeType: 'S' },
                    // { AttributeName: 'reviewUrl', AttributeType: 'S' },
                    // { AttributeName: 'phone', AttributeType: 'S' },
                    // { AttributeName: 'smsPhone', AttributeType: 'S' },
                    // { AttributeName: 'email', AttributeType: 'S' },
                    // { AttributeName: 'manager', AttributeType: 'S' },
                    // { AttributeName: 'managerTitle', AttributeType: 'S' },
                    // { AttributeName: 'managerEmail', AttributeType: 'S' },
                    // { AttributeName: 'managerPhone', AttributeType: 'S' },
                    // { AttributeName: 'isSearchable', AttributeType: 'B' },
                    // { AttributeName: 'status', AttributeType: 'N' },
                    // { AttributeName: 'created', AttributeType: 'S' },
                    // { AttributeName: 'modified', AttributeType: 'S' },
                    // { AttributeName: 'deleted', AttributeType: 'S' },
                    // { AttributeName: 'isRxt', AttributeType: 'B' }
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