import { IAuthenticatedHeader, IEntity, IWithSessionHeader } from "../generics";
import { IWorkspace } from "../models";

/**
 * @see https://github.com/leandroluk/apure-api-data/issues/11
 */
export type IEditWorkspaceCase = {
  edit (data: IEditWorkspaceCase.Data): Promise<void>;
};
export namespace IEditWorkspaceCase {
  export type Data = {
    headers: IAuthenticatedHeader & IWithSessionHeader;
    params: { workspace_id: string; };
    body: Partial<Omit<IWorkspace, keyof IEntity>>;
  };
}
