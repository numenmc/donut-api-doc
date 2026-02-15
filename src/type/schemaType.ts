export type PrimitiveType = "string" | "number" | "boolean" | "uuid";

export type TypeRef =
  | { kind: "primitive"; name: PrimitiveType }
  | { kind: "object"; schema: Schema }
  | { kind: "array"; of: TypeRef }
  | { kind: "union"; values: string[] }
  | { kind: "record"; key: TypeRef; value: TypeRef }
  | { kind: "static"; value: number | string };

export interface Field {
  name: string;
  type: TypeRef;
  required?: boolean;
  description?: string;
  unstable?: boolean;
}

export interface Schema {
  name?: string;
  fields: Field[];
}
