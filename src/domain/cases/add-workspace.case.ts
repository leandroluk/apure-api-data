import { IAuthenticatedHeader, IEntity } from "../generics";
import { IWorkspace } from "../models";

/**
 * @see https://github.com/leandroluk/apure-api-data/issues/4
 */
export type IAddWorkspaceCase = {
  add (
    data: IAddWorkspaceCase.Data
  ): Promise<IAddWorkspaceCase.Result>;
};
export namespace IAddWorkspaceCase {
  export type Data = {
    headers: IAuthenticatedHeader;
    body: Omit<IWorkspace, keyof IEntity>;
  };
  export type Result = IWorkspace & {};
}
