import { IAccount, IWorkspace, IWorkspaceAccount } from "$/domain/models";

export type IGetWorkspaceAccountByAccountRepo = {
  get (data: IGetWorkspaceAccountByAccountRepo.Data): Promise<IGetWorkspaceAccountByAccountRepo.Result>;
};
export namespace IGetWorkspaceAccountByAccountRepo {
  export type Data = {
    account_id: IAccount["_id"];
    workspace_id: IWorkspace["_id"];
  };
  export type Result = IWorkspaceAccount & {};
}
