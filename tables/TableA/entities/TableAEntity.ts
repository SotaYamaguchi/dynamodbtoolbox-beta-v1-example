import { Entity } from "dynamodb-toolbox";
import { TableA } from "../TableA";

export const TableAEntity = new Entity({
    attributes: {
        age: { type: "number" },
        email: { type: "string" },
        name: { type: "string" },
        pk: { partitionKey: true },
        sk: { sortKey: true },
    },
    name: "TableAEntity",
    table: TableA
})