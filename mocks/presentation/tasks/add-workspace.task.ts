import { IAddWorkspaceTask } from "$/presentation/tasks";
import { mockWorkspace } from "mocks/domain/models";

export class MockAddWorkspaceTask implements IAddWorkspaceTask {
  constructor (
    public $add: IAddWorkspaceTask.Result = { ...mockWorkspace }
  ) { }

  async add (_data: IAddWorkspaceTask.Data): Promise<IAddWorkspaceTask.Result> {
    return this.$add;
  }
}
