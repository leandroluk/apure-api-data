import { IEntity } from "../generics";
import { IWorkspace } from "./workspace";

export type IWorkspaceGroup = IEntity & {
  workspace_uid: IWorkspace["_uid"];
  name: string;
  subgroups: string[];
};
