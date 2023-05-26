import { OpenAPIV3 } from "openapi-types";
import { IRequiredKeys } from "./required-keys";

export type IObjectSchema<T extends {}> = OpenAPIV3.SchemaObject & {
  type: "object";
  required: Array<IRequiredKeys<T>>;
  properties: {
    [K in keyof T]: OpenAPIV3.SchemaObject
  };
};
