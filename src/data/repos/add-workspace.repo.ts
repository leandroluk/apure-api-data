import { IWorkspace } from "$/domain/models";

export type IAddWorkspaceRepo = {
  add (
    data: IAddWorkspaceRepo.Data
  ): Promise<void>;
};
export namespace IAddWorkspaceRepo {
  export type Data = {
    value: IWorkspace;
    sessionId?: string;
  };
}
