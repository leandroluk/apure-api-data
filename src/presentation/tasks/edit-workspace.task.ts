import { IEntity } from "$/domain/generics";
import { IWorkspace } from "$/domain/models";

export type IEditWorkspaceTask = {
  edit (
    data: IEditWorkspaceTask.Data,
  ): Promise<IEditWorkspaceTask.Result>;
};
export namespace IEditWorkspaceTask {
  export type Data = {
    id: IWorkspace["_id"];
    changes: Partial<Omit<IWorkspace, keyof IEntity>>;
    sessionId?: string;
  };
  export type Result = IWorkspace & {};
}
