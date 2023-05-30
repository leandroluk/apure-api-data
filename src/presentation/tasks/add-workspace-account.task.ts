import { IEntity } from "$/domain/generics";
import { IWorkspaceAccount } from "$/domain/models";

export type IAddWorkspaceAccountTask = {
  add (data: IAddWorkspaceAccountTask.Data): Promise<IAddWorkspaceAccountTask.Result>;
};
export namespace IAddWorkspaceAccountTask {
  export type Data = Omit<IWorkspaceAccount, keyof IEntity>;
  export type Result = IWorkspaceAccount & {};
}
