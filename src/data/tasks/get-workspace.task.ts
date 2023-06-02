import { IGetWorkspaceTask } from "$/presentation/tasks";
import { IGetWorkspaceRepo } from "../repos";

export class GetWorkspaceTask implements IGetWorkspaceTask {
  constructor (
    private readonly getWorkspace: IGetWorkspaceRepo
  ) { }

  async get (id: IGetWorkspaceTask.Id): Promise<IGetWorkspaceTask.Result> {
    const account = await this.getWorkspace.get(id);
    return account;
  }
}
