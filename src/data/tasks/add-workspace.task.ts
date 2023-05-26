import { IAddWorkspaceTask } from "$/presentation/tasks";
import { ICreateUuidAdapter } from "../adapters";
import { IAddWorkspaceRepo } from "../repos";

export class AddWorkspaceTask implements IAddWorkspaceTask {
  constructor (
    private readonly createUuid: ICreateUuidAdapter,
    private readonly addWorkspace: IAddWorkspaceRepo
  ) { }

  async add (
    data: IAddWorkspaceTask.Data
  ): Promise<IAddWorkspaceTask.Result> {
    const now = new Date();
    const workspace: IAddWorkspaceRepo.Data = {
      _id: await this.createUuid.create(),
      _timestamp: now,
      _created: now,
      _removed: null,
      name: data.name,
      ownerCnpj: data.ownerCnpj
    };
    await this.addWorkspace.add(workspace);
    return workspace;
  }
}
