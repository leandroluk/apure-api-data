import { IAuthenticatedHeader, IEntity } from "../generics";
import { IWorkspace } from "../models";

/**
 * @see https://github.com/leandroluk/apure-api-data/issues/11
 */
export type IEditWorkspaceCase = {
  edit (data: IEditWorkspaceCase.Data): Promise<IEditWorkspaceCase.Result>;
};
export namespace IEditWorkspaceCase {
  export type Data = {
    headers: IAuthenticatedHeader;
    params: Pick<IWorkspace, "_id">;
    body: Partial<Omit<IWorkspace, keyof IEntity>>;
  };
  export type Result = IWorkspace & {};
}
