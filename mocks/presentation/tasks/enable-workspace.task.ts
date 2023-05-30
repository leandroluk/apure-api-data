import { IDisableWorkspaceTask, IEnableWorkspaceTask } from "$/presentation/tasks";
import { mockWorkspace } from "mocks/domain/models";

export class MockEnableWorkspaceTask implements IEnableWorkspaceTask {
  constructor (
    public $enable: IEnableWorkspaceTask.Result = { ...mockWorkspace }
  ) { }

  async enable (
    _id: IDisableWorkspaceTask.Id
  ): Promise<IEnableWorkspaceTask.Result> {
    return this.$enable;
  }
}
