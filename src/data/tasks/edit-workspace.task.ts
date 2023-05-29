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
    const oWorkspace = await this.getWorkspace.get(id);
    if (oWorkspace) {
      const fullChanges: IEditWorkspaceRepo.Changes = {
        ...changes,
        _timestamp: new Date()
      };
      await this.editWorkspace.edit(id, fullChanges);
      return { ...oWorkspace, ...fullChanges };
    }
  }
}
