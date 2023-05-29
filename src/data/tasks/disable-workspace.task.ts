import { IDisableWorkspaceTask } from "$/presentation/tasks";
import { IEditWorkspaceRepo, IGetWorkspaceRepo } from "../repos";

export class DisableWorkspaceTask implements IDisableWorkspaceTask {
  constructor (
    private readonly getWorkspace: IGetWorkspaceRepo,
    private readonly editWorkspace: IEditWorkspaceRepo
  ) { }

  async disable (
    id: IDisableWorkspaceTask.Id
  ): Promise<IDisableWorkspaceTask.Result> {
    const workspace = await this.getWorkspace.get(id);
    if (workspace && !workspace._removed) {
      const now = new Date();
      const changes: IEditWorkspaceRepo.Changes = {
        _timestamp: now,
        _removed: now
      };
      await this.editWorkspace.edit(id, changes);
      return true;
    }
    return false;
  }
}
