import { IAuthenticatedHeader, IWithSessionHeader } from "../generics";
import { IWorkspace } from "../models";

export type IEnableWorkspaceCase = {
  enable (data: IEnableWorkspaceCase.Data): Promise<IEnableWorkspaceCase.Result>;
};
export namespace IEnableWorkspaceCase {
  export type Data = {
    headers: IAuthenticatedHeader & IWithSessionHeader;
    params: { workspace_id: string; };
  };
  export type Result = IWorkspace & {};
}
