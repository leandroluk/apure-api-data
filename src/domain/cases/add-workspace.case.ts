import { IAuthenticatedHeader, IEntity, IWithSessionHeader } from "../generics";
import { IWorkspace } from "../models";

/**
 * @see https://github.com/leandroluk/apure-api-data/issues/4
 */
export type IAddWorkspaceCase = {
  add (data: IAddWorkspaceCase.Data): Promise<void>;
};
export namespace IAddWorkspaceCase {
  export type Data = {
    headers: IAuthenticatedHeader & IWithSessionHeader;
    body: Omit<IWorkspace, keyof IEntity>;
  };
}
