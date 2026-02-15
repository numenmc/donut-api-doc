import type { Schema } from "../../type/schemaType";

export const player: Schema = {
    fields: [
        {
            name: "name",
            type: { kind: "primitive", name: "string" },
            description: "The current username of the player. This value is stored in lowercase."
        },
        {
            name: "uuid",
            type: { kind: "primitive", name: "uuid" },
            description: "The UUID of the player. This never changes."
        }
    ]
}