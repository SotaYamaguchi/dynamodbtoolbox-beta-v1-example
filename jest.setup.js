const { CreateTableCommand, DeleteTableCommand, DynamoDBClient, ListTablesCommand } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb')
const { TableA } = require('./tables/tableA/TableA')

const createInstance = () => {
  const client = new DynamoDBClient({
    credentials: {
      accessKeyId: 'DUMMYIDEXAMPLE',
      secretAccessKey: 'DUMMYIDEXAMPLE',
    },
    endpoint: 'http://localhost:4566',
    region: 'ap-northeast-1'
  })

  return {
    client,
  }
}


const createCommand = (tableName) => {
  return new CreateTableCommand({
    AttributeDefinitions: [
      {
        AttributeName: 'pk',
        AttributeType: 'S',
      },
      {
        AttributeName: 'sk',
        AttributeType: 'S',
      },
      {
        AttributeName: 'gsi1pk',
        AttributeType: 'S',
      },
      {
        AttributeName: 'gsi1sk',
        AttributeType: 'S',
      },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    GlobalSecondaryIndexes: [
      {
        IndexName: 'gsi1',
        KeySchema: [
          {
            AttributeName: 'gsi1pk',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'gsi1sk',
            KeyType: 'RANGE',
          },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
      },
    ],
    KeySchema: [
      {
        AttributeName: 'pk',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'sk',
        KeyType: 'RANGE',
      },
    ],
    TableName: tableName,
  })
}

const deleteCommand = (tableName) => {
  return new DeleteTableCommand({
    TableName: tableName,
  })
}

const listTablesCommand = () => {
  return new ListTablesCommand({})
}


beforeAll(async () => {
  const marshallOptions = {
    convertEmptyValues: false,
  }
  const translateConfig = { marshallOptions }

  const { client } = createInstance()

  TableA.name = TableA.name + process.env.JEST_WORKER_ID

  const { TableNames } = await client.send(listTablesCommand())

  if (TableNames.includes(TableA.name)) {
    const deleteCreditedTableCommand = deleteCommand(TableA.name)
    await client.send(deleteCreditedTableCommand)
  }
  const createCreditedTableCommand = createCommand(TableA.name)
  await client.send(createCreditedTableCommand)
  TableA.DocumentClient = DynamoDBDocumentClient.from(client, translateConfig)
})