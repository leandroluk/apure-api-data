import { IAuthenticatedHeader } from "../generics";
import { IWorkspace } from "../models";

/**
 * @see https://github.com/leandroluk/apure-api-data/issues/7
 */
export type IDisableWorkspaceCase = {
  disable (data: IDisableWorkspaceCase.Data): Promise<void>;
};
export namespace IDisableWorkspaceCase {
  export type Data = {
    headers: IAuthenticatedHeader;
    params: Pick<IWorkspace, "_id">;
  };
}
