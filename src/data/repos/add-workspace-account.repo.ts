import { IWorkspaceAccount } from "$/domain/models";

export type IAddWorkspaceAccountRepo = {
  add (data: IAddWorkspaceAccountRepo.Data): Promise<void>;
};
export namespace IAddWorkspaceAccountRepo {
  export type Data = {
    value: IWorkspaceAccount;
    sessionId?: string;
  };
}
