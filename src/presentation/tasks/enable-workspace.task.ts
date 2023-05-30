import { IWorkspace } from "$/domain/models";

export type IEnableWorkspaceTask = {
  enable (id: IEnableWorkspaceTask.Id): Promise<IEnableWorkspaceTask.Result>;
};
export namespace IEnableWorkspaceTask {
  export type Id = IWorkspace["_id"];
  export type Result = IWorkspace & {};
}
