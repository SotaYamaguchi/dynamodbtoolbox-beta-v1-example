import { Table } from 'dynamodb-toolbox'

export const TableA = new Table({
  indexes: {
    GSI1: { partitionKey: 'gsi1pk', sortKey: 'gsi1sk' },
  },
  name: 'tableA',
  partitionKey: 'pk',
  sortKey: 'sk',
})
