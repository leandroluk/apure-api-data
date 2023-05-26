import { IEntity, IIndexable } from "../generics";
import { IWorkspace } from "./workspace";

export type IWorkspaceAccount = IEntity & {
  workspace_id: IWorkspace["_id"];
  account_id: IIndexable["_id"];
  roles: string[];
};
