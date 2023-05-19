import { IEntity } from "../generics";
import { IWorkspace } from "./workspace";

export type IWorkspacePlayer = IEntity & {
  workspace_uid: IWorkspace["_uid"];
  name: string;
  cnpj: string;
  state: string;
  latitude?: number;
  longitude?: number;
};
