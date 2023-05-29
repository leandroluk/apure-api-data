import { IWorkspace } from "$/domain/models";

export type IGetWorkspaceRepo = {
  get (
    id: IGetWorkspaceRepo.Id
  ): Promise<IGetWorkspaceRepo.Result>;
};
export namespace IGetWorkspaceRepo {
  export type Id = IWorkspace["_id"];
  export type Result = IWorkspace & {};
}
