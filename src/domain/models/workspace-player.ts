import { IEntity } from "../generics";
import { IWorkspace } from "./workspace";

export type IWorkspacePlayer = IEntity & {
  workspace_id: IWorkspace["_id"];
  name: string;
  cnpj: string;
  state: string;
  latitude?: number;
  longitude?: number;
};
