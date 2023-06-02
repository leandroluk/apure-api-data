import { IWorkspaceAccount } from "$/domain/models";

export type IGetWorkspaceAccountByAccountTask = {
  get (data: IGetWorkspaceAccountByAccountTask.Data): Promise<IGetWorkspaceAccountByAccountTask.Result>;
};
export namespace IGetWorkspaceAccountByAccountTask {
  export type Data = {
    account_id: IWorkspaceAccount["account_id"];
    workspace_id: IWorkspaceAccount["workspace_id"];
  };
  export type Result = IWorkspaceAccount & {};
}
