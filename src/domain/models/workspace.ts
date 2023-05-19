import { IEntity } from "../generics";
import { IWorkspacePlayer } from "./workspace-player";

export type IWorkspace = IEntity & {
  name: string;
  mainPlayer_uid: IWorkspacePlayer["_uid"];
};
