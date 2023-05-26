import { IWorkspace } from "$/domain/models";
import { IObjectSchema } from "../types";

export const workspaceDTO: IObjectSchema<IWorkspace> = {
  type: "object",
  required: [
    "_id",
    "_timestamp",
    "_created",
    "name",
    "ownerCnpj"
  ],
  properties: {
    _id: { type: "string", format: "uuid" },
    _timestamp: { type: "string", format: "date-time" },
    _created: { type: "string", format: "date-time" },
    _removed: { type: "string", format: "date-time" },
    name: { type: "string", example: "Example" },
    ownerCnpj: { type: "string", format: "email", example: "00111222000133" }
  }
};
