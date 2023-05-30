import { IEnableWorkspaceTask } from "$/presentation/tasks";
import { IEditWorkspaceRepo, IGetWorkspaceRepo } from "../repos";

export class EnableWorkspaceTask implements IEnableWorkspaceTask {
  constructor (
    private readonly getWorkspace: IGetWorkspaceRepo,
    private readonly editWorkspace: IEditWorkspaceRepo
  ) { }

  async enable (
    id: IEnableWorkspaceTask.Id
  ): Promise<IEnableWorkspaceTask.Result> {
    const workspace = await this.getWorkspace.get(id);
    if (workspace?._removed) {
      const changes: IEditWorkspaceRepo.Changes = {
        _timestamp: new Date(),
        _removed: null
      };
      await this.editWorkspace.edit(id, changes);
      return { ...workspace, ...changes };
    }
  }
}
