import { IEntity, IIndexable } from "../generics";
import { IWorkspace } from "./workspace";

export type IWorkspaceAccount = IEntity & {
  workspace_uid: IWorkspace["_uid"];
  account_uid: IIndexable["_uid"];
  roles: string[];
};
