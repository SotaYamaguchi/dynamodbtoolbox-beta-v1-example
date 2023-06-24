import { Table } from 'dynamodb-toolbox'

export const TableA = new Table({
  indexes: {
    GSI1: { partitionKey: 'gsi1pk', sortKey: 'gsi1sk' },
  },
  name: 'TableA',
  partitionKey: 'pk',
  sortKey: 'sk',
})
