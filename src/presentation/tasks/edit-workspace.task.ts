import { IEntity } from "$/domain/generics";
import { IWorkspace } from "$/domain/models";

export type IEditWorkspaceTask = {
  edit (
    id: IEditWorkspaceTask.Id,
    changes: IEditWorkspaceTask.Changes
  ): Promise<IEditWorkspaceTask.Result>;
};
export namespace IEditWorkspaceTask {
  export type Id = IWorkspace["_id"];
  export type Changes = Partial<Omit<IWorkspace, keyof IEntity>>;
  export type Result = IWorkspace & {};
}
