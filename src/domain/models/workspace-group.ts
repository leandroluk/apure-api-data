import { IEntity } from "../generics";
import { IWorkspace } from "./workspace";

export type IWorkspaceGroup = IEntity & {
  workspace_id: IWorkspace["_id"];
  name: string;
  subgroups: string[];
};
