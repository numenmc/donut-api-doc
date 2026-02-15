import type { Schema } from "../../type/schemaType";

export const item: Schema = {
  fields: [
    {
      name: "count",
      type: { kind: "primitive", name: "number" },
      description: "The stack size of the item."
    },
    {
      name: "display_name",
      type: { kind: "primitive", name: "string" },
      description:
        "If the item is named in an anvil, the unformatted name will be included here. If there is no custom name, this field will have an empty string."
    },
    {
      name: "enchants",
      description:
        "Despite the name, this field stores enchantment information and armor trim information.",
      type: {
        kind: "object",
        schema: {
          fields: [
            {
              name: "enchantments",
              type: {
                kind: "object",
                schema: {
                  fields: [
                    {
                      name: "levels",
                      required: false,
                      type: {
                        kind: "record",
                        key: { kind: "primitive", name: "string" },
                        value: { kind: "primitive", name: "number" }
                      },
                      description:
                        "This field is always <code>null</code>, even when the item has enchantments.",
                      unstable: true
                    }
                  ]
                }
              }
            },
            {
              name: "trim",
              type: {
                kind: "object",
                schema: {
                  fields: [
                    {
                      name: "material",
                      type: {
                        kind: "primitive",
                        name: "string"
                      },
                      description:
                        "The name of the material, prefixed with <code>minecraft:</code>. If there is no trim this field will have an empty string."
                    },
                    {
                      name: "pattern",
                      type: {
                        kind: "primitive",
                        name: "string"
                      },
                      description:
                        "The name of the trim pattern, prefixed with <code>minecraft:</code>. If there is no trim this field will have an empty string."
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    },
    {
      name: "id",
      type: { kind: "primitive", name: "string" },
      description: "The minecraft ID of the item, prefixed with <code>minecraft:</code>"
    },
    {
      name: "lore",
      required: false,
      type: { kind: "array", of: { kind: "primitive", name: "string" } },
      description:
        "Lore lines for the item. This should never be filled when dealing with vanilla items."
    }
  ]
};

export const shulkerItem: Schema = {
  fields: [
    ...item.fields,
    {
      name: "contents",
      required: false,
      type: { kind: "array", of: { kind: "object", schema: item } },
      description: "If the item is a bundle or a shulker box, the item's inventory is defined here."
    }
  ]
};
