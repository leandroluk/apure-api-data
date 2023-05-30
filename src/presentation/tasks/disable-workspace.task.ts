import { IWorkspace } from "$/domain/models";

export type IDisableWorkspaceTask = {
  disable (
    data: IDisableWorkspaceTask.Data
  ): Promise<IDisableWorkspaceTask.Result>;
};
export namespace IDisableWorkspaceTask {
  export type Data = {
    id: IWorkspace["_id"];
    sessionId?: string;
  };
  export type Result = boolean;
}
