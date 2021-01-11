import * as aws from 'aws-sdk';

aws.config.update({
    region: 'us-east-2'
});

const params = {
    TableName : 'Movies',
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