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
    const workspaceAccount: IAddWorkspaceAccountRepo.Data["value"] = {
      _id: await this.createUuid.create(),
      _timestamp: now,
      _created: now,
      _removed: null,
      account_id: data.value.account_id,
      workspace_id: data.value.workspace_id,
      roles: data.value.roles
    };
    await this.addWorkspaceAccount.add({
      value: workspaceAccount,
      sessionId: data.sessionId
    });
    return workspaceAccount;
  }
}
