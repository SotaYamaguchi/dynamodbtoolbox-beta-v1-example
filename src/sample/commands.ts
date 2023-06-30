import {DeleteItemCommand, GetItemCommand, PutItemCommand} from "dynamodb-toolbox";
import { TableAEntity } from "../../tables/TableA/entities/TableAEntity"
import type {TableA} from "../../tables/TableA/TableA";
import type { PrimaryKey} from "dynamodb-toolbox";

const dummyData = {
    age: 30,
    email: 'example@example.com',
    gender: 'male' as const,
    job: {
        type: 'engineer' as const,
    },
    name: 'John Doe',
    pk: 'user_123',
    sk: 'profile',
    skillsByList: ['JavaScript', 'Python', 'SQL'],
    skillsByMap: {
        karate: '黒帯' as const,
        kendo: '初段' as const,
    },
    skillsByRecord: {
        framework: 'React',
        language: 'English',
    },
    skillsBySet: new Set<string>(['Guitar', 'Singing']),
};

export const putCommand = async (): Promise<void> => {
    await TableAEntity.build(PutItemCommand).item(dummyData).options(
        {
            condition: {
                attr: 'pk',
                exists: false,
            }
        }
    ).send();
}

export const getCommand = async (primaryKey: PrimaryKey<typeof TableA>): Promise<string> => {
    const { pk, sk } = primaryKey
    const { Item } = await TableAEntity.build(GetItemCommand).key({ pk, sk }).send();

    if (Item === undefined) {
        throw new Error('Item is not found')
    }

    if (Item.job.type === 'doctor') {
        return `${Item.name} is a doctor. License start date is ${Item.job.licenseStartDate}`
    }

    return `${Item.name} is a ${Item.job.type}`
}

export const deleteCommand = async (primaryKey: PrimaryKey<typeof TableA>): Promise<void> => {
    const { pk, sk } = primaryKey
    await TableAEntity.build(DeleteItemCommand).key({ pk, sk }).send();
}