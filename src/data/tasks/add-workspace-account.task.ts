import { IAddWorkspaceAccountTask } from "$/presentation/tasks";
import { ICreateUuidAdapter } from "../adapters";
import { IAddWorkspaceAccountRepo } from "../repos";

export class AddWorkspaceAccountTask implements IAddWorkspaceAccountTask {
  constructor (
    private readonly createUuid: ICreateUuidAdapter,
    private readonly addWorkspaceAccount: IAddWorkspaceAccountRepo
  ) { }

  async add (
    data: IAddWorkspaceAccountTask.Data
  ): Promise<IAddWorkspaceAccountTask.Result> {
    const now = new Date();
    const workspaceAccount: IAddWorkspaceAccountRepo.Data = {
      _id: await this.createUuid.create(),
      _timestamp: now,
      _created: now,
      _removed: null,
      account_id: data.account_id,
      workspace_id: data.workspace_id,
      roles: data.roles
    };
    await this.addWorkspaceAccount.add(workspaceAccount);
    return workspaceAccount;
  }
}
