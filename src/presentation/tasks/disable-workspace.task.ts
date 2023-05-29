import { IWorkspace } from "$/domain/models";

export type IDisableWorkspaceTask = {
  disable (
    id: IDisableWorkspaceTask.Id
  ): Promise<IDisableWorkspaceTask.Result>;
};
export namespace IDisableWorkspaceTask {
  export type Id = IWorkspace["_id"];
  export type Result = boolean;
}
