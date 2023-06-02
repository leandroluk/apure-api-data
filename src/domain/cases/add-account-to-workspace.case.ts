import { IAuthenticatedHeader, IEntity, IWithSessionHeader } from "../generics";
import { IWorkspaceAccount } from "../models";

/**
 * @see https://github.com/leandroluk/apure-api-data/issues/3
 */
export type IAddAccountToWorkspaceCase = {
  add (data: IAddAccountToWorkspaceCase.Data): Promise<void>;
};
export namespace IAddAccountToWorkspaceCase {
  export type Data = {
    headers: IAuthenticatedHeader & IWithSessionHeader;
    params: { workspace_id: string; };
    body: Omit<IWorkspaceAccount, keyof IEntity | "workspace_id">;
  };
}
