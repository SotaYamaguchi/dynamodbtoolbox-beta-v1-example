import {any, anyOf, EntityV2, list, map, number, record, schema, set, string} from "dynamodb-toolbox";
import { TableA } from "../TableA";

export const TableAEntity = new EntityV2({
    name: "TableAEntity",
    schema: schema({
        age: number(),
        email: string(),
        gender: string().enum('male', 'female', 'other'),
        /*
         * job: {
         *   type: 'engineer',
         * } | {
         *   licenseStartDate: string,
         *   type: 'doctor',
         * }
         */
        job: anyOf([
            map({
                type: string().const('engineer'),
            }),
            map({
                licenseStartDate: string().required(),
                type: string().const('doctor'),
            })
        ]),
        metadata: any().optional(),
        name: string(),
        pk: string().key(),
        sk: string().key(),
        /*
          * skillsByList: string[]
         */
        skillsByList: list(string()),
        /*
         * skillsByMap: {
         *  karate: '白帯' | '茶帯' | '黒帯',
         *  kendo: '初段' | '二段' | '三段',
         * }
         */
        skillsByMap: map({
            karate: string().enum('白帯', '茶帯', '黒帯'),
            kendo: string().enum('初段', '二段', '三段'),
        }),
        // Record<string, string>
        skillsByRecord: record(string(), string()),
        // Set<string>
        skillsBySet: set(string()),
    }),
    table: TableA
})