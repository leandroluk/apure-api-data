import { IEntity } from "$/domain/generics";
import { IWorkspace } from "$/domain/models";

export type IAddWorkspaceTask = {
  add (
    data: IAddWorkspaceTask.Data
  ): Promise<IAddWorkspaceTask.Result>;
};
export namespace IAddWorkspaceTask {
  export type Data = Omit<IWorkspace, keyof IEntity>;
  export type Result = IWorkspace & {};
}
