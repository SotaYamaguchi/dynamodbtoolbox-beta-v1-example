import { TableAEntity } from "../../tables/TableA/entities/TableAEntity"

export const get = async (pk: string, sk: string) => {
    const result = await TableAEntity.get({ pk, sk })
    return result
}