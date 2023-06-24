import { TableA } from '../../tables/TableA/TableA'
import { get } from './get'

describe('get', () => {
    beforeAll(() => {
        TableA.DocumentClient = globalThis.DocumentClient
        console.log(TableA.name)
        console.log(TableA.DocumentClient)
    })
        
    it('should get an item', async () => {
        const result = await get('pk', 'sk')
        expect(result).toEqual({ pk: 'pk', sk: 'sk' })
    })
})