import { IEditWorkspaceTask } from "$/presentation/tasks";
import { IEditWorkspaceRepo, IGetWorkspaceRepo } from "../repos";

export class EditWorkspaceTask implements IEditWorkspaceTask {
  constructor (
    private readonly getWorkspace: IGetWorkspaceRepo,
    private readonly editWorkspace: IEditWorkspaceRepo
  ) { }

  async edit (data: IEditWorkspaceTask.Data): Promise<IEditWorkspaceTask.Result> {
    const workspace = await this.getWorkspace.get(data.id);
    if (workspace && !workspace._removed) {
      const fullChanges: IEditWorkspaceRepo.Data["changes"] = {
        ...data.changes,
        _timestamp: new Date()
      };
      await this.editWorkspace.edit({
        id: data.id,
        changes: fullChanges,
        sessionId: data.sessionId
      });
      return { ...workspace, ...fullChanges };
    }
  }
}
