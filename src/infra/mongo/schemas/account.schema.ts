import { IAccount } from "$/domain/models";
import { ISchema } from "../types";

export const accountSchema: ISchema<IAccount> = {
  collection: "account",
  projection: {
    _id: "$_id",
    _timestamp: "$_timestamp",
    _created: "$_created",
    _removed: "$_removed",
    name: "$name",
    email: "$email"
  },
  fullTextFields: [
    "email",
    "name"
  ]
};
