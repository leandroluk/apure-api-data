import { IEditWorkspaceTask } from "$/presentation/tasks";
import { IEditWorkspaceRepo, IGetWorkspaceRepo } from "../repos";

export class EditWorkspaceTask implements IEditWorkspaceTask {
  constructor (
    private readonly getWorkspace: IGetWorkspaceRepo,
    private readonly editWorkspace: IEditWorkspaceRepo
  ) { }

  async edit (
    id: IEditWorkspaceTask.Id,
    changes: IEditWorkspaceTask.Changes
  ): Promise<IEditWorkspaceTask.Result> {
    const workspace = await this.getWorkspace.get(id);
    if (workspace && !workspace._removed) {
      const fullChanges: IEditWorkspaceRepo.Changes = {
        ...changes,
        _timestamp: new Date()
      };
      await this.editWorkspace.edit(id, fullChanges);
      return { ...workspace, ...fullChanges };
    }
  }
}
