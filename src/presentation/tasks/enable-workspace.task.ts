import { IWorkspace } from "$/domain/models";

export type IEnableWorkspaceTask = {
  enable (
    data: IEnableWorkspaceTask.Data
  ): Promise<IEnableWorkspaceTask.Result>;
};
export namespace IEnableWorkspaceTask {
  export type Data = {
    id: IWorkspace["_id"];
    sessionId?: string;
  };
  export type Result = IWorkspace & {};
}
