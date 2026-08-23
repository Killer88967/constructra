export type JsonSchemaType =
  | "string"
  | "number"
  | "integer"
  | "boolean"
  | "object"
  | "array"
  | "null";

export interface JsonSchema {
  $schema?: string;
  $id?: string;
  $ref?: string;

  title?: string;
  description?: string;

  type?: JsonSchemaType | JsonSchemaType[];

  default?: unknown;
  examples?: unknown[];

  enum?: unknown[];
  const?: unknown;

  properties?: Record<string, JsonSchema>;
  patternProperties?: Record<string, JsonSchema>;

  required?: string[];

  additionalProperties?: boolean | JsonSchema;

  items?: JsonSchema | JsonSchema[];

  minimum?: number;
  maximum?: number;

  minLength?: number;
  maxLength?: number;

  minItems?: number;
  maxItems?: number;

  pattern?: string;

  oneOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  allOf?: JsonSchema[];

  not?: JsonSchema;

  deprecated?: boolean;
}

export interface RegisteredJsonSchema extends JsonSchema {
  $schema: string;
  title: string;
  description: string;
}

export interface SchemaRegistration {
  uri: string;
  fileMatch: string[];
  schema: RegisteredJsonSchema;
}
