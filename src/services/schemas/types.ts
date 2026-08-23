export interface JsonSchemaBase {
  $schema?: string;
  $id?: string;
  $ref?: string;

  title?: string;
  description?: string;

  default?: unknown;
  examples?: unknown[];

  enum?: unknown[];
  const?: unknown;

  oneOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  allOf?: JsonSchema[];

  not?: JsonSchema;

  deprecated?: boolean;
}

export interface JsonStringSchema extends JsonSchemaBase {
  type: "string";

  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface JsonNumberSchema extends JsonSchemaBase {
  type: "number" | "integer";

  minimum?: number;
  maximum?: number;
}

export interface JsonBooleanSchema extends JsonSchemaBase {
  type: "boolean";
}

export interface JsonNullSchema extends JsonSchemaBase {
  type: "null";
}

export interface JsonArraySchema extends JsonSchemaBase {
  type: "array";

  items?: JsonSchema | JsonSchema[];

  minItems?: number;
  maxItems?: number;
}

export interface JsonObjectSchema extends JsonSchemaBase {
  type: "object";

  properties?: Record<string, JsonSchema>;
  patternProperties?: Record<string, JsonSchema>;

  required?: string[];

  additionalProperties?: boolean | JsonSchema;
}

export type JsonSchema =
  | JsonStringSchema
  | JsonNumberSchema
  | JsonBooleanSchema
  | JsonNullSchema
  | JsonArraySchema
  | JsonObjectSchema
  | JsonSchemaBase;

export type RegisteredJsonSchema = JsonSchema & {
  $schema: string;
  title: string;
  description: string;
};

export interface SchemaRegistration {
  uri: string;
  fileMatch: string[];
  schema: RegisteredJsonSchema;
}
