import { IAccount } from "$/domain/models";
import { IObjectSchema } from "../types";

export const accountDTO: IObjectSchema<IAccount> = {
  type: "object",
  required: [
    "_id",
    "_timestamp",
    "_created",
    "name",
    "email"
  ],
  properties: {
    _id: { type: "string", format: "uuid" },
    _timestamp: { type: "string", format: "date-time" },
    _created: { type: "string", format: "date-time" },
    _removed: { type: "string", format: "date-time" },
    name: { type: "string", example: "John Doe" },
    email: { type: "string", format: "email", example: "john.doe@domain.com" }
  }
};
