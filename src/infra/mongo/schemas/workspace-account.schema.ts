import { IWorkspaceAccount } from "$/domain/models";
import { ISchema } from "../types";

export const workspaceAccountSchema: ISchema<IWorkspaceAccount> = {
  collection: "workspaceAccount",
  projection: {
    _id: "$_id",
    _timestamp: "$_timestamp",
    _created: "$_created",
    _removed: "$_removed",
    account_id: "$account_id",
    roles: "$roles",
    workspace_id: "$workspace_id"
  },
  fullTextFields: [
  ]
};
