import { IIndexable } from "$/domain/generics";

export type ISchema<T extends IIndexable> = {
  collection: string;
  projection: Record<keyof T, `$${string}`>;
  fullTextFields: Array<keyof T>;
};
