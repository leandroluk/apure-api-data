import { IEntity, IIndexable } from "../generics";
import { IWorkspace } from "./workspace";

export type IWorkspaceAccount = IEntity & {
  workspace_id: IWorkspace["_id"];
  account_id: IIndexable["_id"];
  roles: IWorkspaceAccount.Role[];
};
export namespace IWorkspaceAccount {
  export enum Role {
    Admin = "admin",
    Manager = "manager",
    Viewer = "viewer"
  }
}
