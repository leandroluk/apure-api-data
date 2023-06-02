import { IWorkspace } from "$/domain/models";

export type IGetWorkspaceTask = {
  get (
    id: IGetWorkspaceTask.Id
  ): Promise<IGetWorkspaceTask.Result>;
};
export namespace IGetWorkspaceTask {
  export type Id = IWorkspace["_id"];
  export type Result = IWorkspace & {};
}
