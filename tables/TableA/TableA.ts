import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { TableV2 } from 'dynamodb-toolbox'

export const TableA = new TableV2({
  documentClient: DynamoDBDocumentClient.from(new DynamoDBClient({})),
  name: 'tableA',
  partitionKey: {
    name: 'pk',
    type: 'string',
  },
  sortKey:  {
    name: 'sk',
    type: 'string',
  },
})
