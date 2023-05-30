import { IAuthenticatedHeader } from "../generics";
import { IWorkspace } from "../models";

export type IEnableWorkspaceCase = {
  enable (data: IEnableWorkspaceCase.Data): Promise<IEnableWorkspaceCase.Result>;
};
export namespace IEnableWorkspaceCase {
  export type Data = {
    headers: IAuthenticatedHeader;
    params: Pick<IWorkspace, "_id">;
  };
  export type Result = IWorkspace & {};
}
