const { CreateTableCommand, DeleteTableCommand, DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocument, DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb')

const CreditedTableName = 'tableA'

// TODO ファイル毎に動いているので、一度だけ動くようにしたい
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

const deleteCreditedTableCommand = deleteCommand(CreditedTableName)
const createCreditedTableCommand = createCommand(CreditedTableName)

const createInstance = () => {
  const client = new DynamoDBClient({
    endpoint: 'http://localhost:8888',
    region: 'ap-northeast-1',
  })

  return {
    client,
  }
}

beforeAll(async () => {
  const marshallOptions = {
    convertEmptyValues: false,
  }
  const translateConfig = { marshallOptions }

  const { client } = createInstance()

  await client
    .send(deleteCreditedTableCommand)
    .catch((error) => {
      // console.log('deleteCreditedTableCommand', error.message)
    })
    .finally(async () => {
      await client
        .send(createCreditedTableCommand)
        .catch((error) => {
          console.log(error)
          // console.log('createCreditedTableCommand', error.message)
        })
        .finally(() => {
          globalThis.DocumentClient = DynamoDBDocumentClient.from(client, translateConfig)
          globalThis.DynamoDBDocument = DynamoDBDocument.from(client, translateConfig)
        })
    })
}, 10_000)

// afterAll(async () => {
//   const { client } = createInstance()
//
//   await client.send(deleteCreditedTableCommand).catch((error) =>{
//     // console.log('afterAll deleteCreditedTableCommand', error.message)
//   })
//
//   await client.send(deleteEventTableCommand).catch((error) => {
//     // console.log('afterAll deleteEventTableCommand', error.message)
//   })
// })
