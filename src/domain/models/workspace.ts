import { IEntity } from "../generics";
import { IWorkspacePlayer } from "./workspace-player";

export type IWorkspace = IEntity & {
  name: string;
  ownerCnpj: IWorkspacePlayer["cnpj"];
};
