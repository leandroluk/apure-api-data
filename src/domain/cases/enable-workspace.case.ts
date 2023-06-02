import { IAuthenticatedHeader, IWithSessionHeader } from "../generics";

/**
 * @see https://github.com/leandroluk/apure-api-data/issues/26
 */
export type IEnableWorkspaceCase = {
  enable (data: IEnableWorkspaceCase.Data): Promise<void>;
};
export namespace IEnableWorkspaceCase {
  export type Data = {
    headers: IAuthenticatedHeader & IWithSessionHeader;
    params: { workspace_id: string; };
  };
}
