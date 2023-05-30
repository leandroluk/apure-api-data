import { IWorkspaceAccount } from "$/domain/models";
import { IObjectSchema } from "../types";

export const workspaceAccountDTO: IObjectSchema<IWorkspaceAccount> = {
  type: "object",
  required: [
    "_id",
    "_timestamp",
    "_created",
    "account_id",
    "workspace_id",
    "roles"
  ],
  properties: {
    _id: { type: "string", format: "uuid" },
    _timestamp: { type: "string", format: "date-time" },
    _created: { type: "string", format: "date-time" },
    _removed: { type: "string", format: "date-time" },
    account_id: { type: "string", format: "uuid" },
    workspace_id: { type: "string", format: "uuid" },
    roles: {
      type: "array",
      items: { type: "string", enum: ["admin", "manager", "viewer"] }
    }
  }
};
