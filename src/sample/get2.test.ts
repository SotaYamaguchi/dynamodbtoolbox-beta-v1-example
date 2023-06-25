import { TableAEntity } from '../../tables/TableA/entities/TableAEntity'
import { get } from './get'

describe('get', () => {    
    it('should get an item', async () => {
        await TableAEntity.put({
            age: 1,
            pk: 'pk1',
            sk: 'sk1',
        })
        const res = await get('pk1', 'sk1')
        expect(res.Item?.age).toBe(1)
        expect(res.Item?.pk).toBe('pk1')
        expect(res.Item?.sk).toBe('sk1')
    })
})