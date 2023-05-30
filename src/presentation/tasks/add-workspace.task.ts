import { IEntity } from "$/domain/generics";
import { IWorkspace } from "$/domain/models";

export type IAddWorkspaceTask = {
  add (
    data: IAddWorkspaceTask.Data
  ): Promise<IAddWorkspaceTask.Result>;
};
export namespace IAddWorkspaceTask {
  export type Data = {
    value: Omit<IWorkspace, keyof IEntity>;
    sessionId?: string;
  };
  export type Result = IWorkspace & {};
}
