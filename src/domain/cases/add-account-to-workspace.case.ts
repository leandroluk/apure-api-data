import { IAuthenticatedHeader, IEntity, IWithSessionHeader } from "../generics";
import { IWorkspace, IWorkspaceAccount } from "../models";

export type IAddAccountToWorkspaceCase = {
  add (
    data: IAddAccountToWorkspaceCase.Data
  ): Promise<void>;
};
export namespace IAddAccountToWorkspaceCase {
  export type Data = {
    headers: IAuthenticatedHeader & IWithSessionHeader;
    params: Pick<IWorkspace, "_id">;
    body: Omit<IWorkspaceAccount, keyof IEntity>;
  };
}
