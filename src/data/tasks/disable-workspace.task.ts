import { IDisableWorkspaceTask } from "$/presentation/tasks";
import { IEditWorkspaceRepo, IGetWorkspaceRepo } from "../repos";

export class DisableWorkspaceTask implements IDisableWorkspaceTask {
  constructor (
    private readonly getWorkspace: IGetWorkspaceRepo,
    private readonly editWorkspace: IEditWorkspaceRepo
  ) { }

  async disable (data: IDisableWorkspaceTask.Data): Promise<IDisableWorkspaceTask.Result> {
    const workspace = await this.getWorkspace.get(data.id);
    if (workspace && !workspace._removed) {
      const now = new Date();
      const changes: IEditWorkspaceRepo.Data["changes"] = {
        _timestamp: now,
        _removed: now
      };
      await this.editWorkspace.edit({
        id: data.id,
        changes,
        sessionId: data.sessionId
      });
      return true;
    }
    return false;
  }
}
