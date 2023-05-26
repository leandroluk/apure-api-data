import { IWorkspace } from "$/domain/models";
import { ISchema } from "../types";

export const workspaceSchema: ISchema<IWorkspace> = {
  collection: "workspace",
  projection: {
    _id: "$_id",
    _timestamp: "$_timestamp",
    _created: "$_created",
    _removed: "$_removed",
    name: "$name",
    ownerCnpj: "$ownerCnpj"
  },
  fullTextFields: [
    "name",
    "ownerCnpj"
  ]
};
