import { IEntity } from "$/domain/generics";
import { IWorkspaceAccount } from "$/domain/models";

export type IAddWorkspaceAccountTask = {
  add (
    data: IAddWorkspaceAccountTask.Data
  ): Promise<IAddWorkspaceAccountTask.Result>;
};
export namespace IAddWorkspaceAccountTask {
  export type Data = {
    value: Omit<IWorkspaceAccount, keyof IEntity>;
    sessionId?: string;
  };
  export type Result = IWorkspaceAccount & {};
}
