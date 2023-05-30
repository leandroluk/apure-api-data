import { IEnableWorkspaceTask } from "$/presentation/tasks";
import { IEditWorkspaceRepo, IGetWorkspaceRepo } from "../repos";

export class EnableWorkspaceTask implements IEnableWorkspaceTask {
  constructor (
    private readonly getWorkspace: IGetWorkspaceRepo,
    private readonly editWorkspace: IEditWorkspaceRepo
  ) { }

  async enable (
    data: IEnableWorkspaceTask.Data
  ): Promise<IEnableWorkspaceTask.Result> {
    const workspace = await this.getWorkspace.get(data.id);
    if (workspace?._removed) {
      const changes: IEditWorkspaceRepo.Data["changes"] = {
        _timestamp: new Date(),
        _removed: null
      };
      await this.editWorkspace.edit({
        id: data.id,
        changes,
        sessionId: data.sessionId
      });
      return { ...workspace, ...changes };
    }
  }
}
