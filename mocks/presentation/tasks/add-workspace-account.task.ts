import { IAddWorkspaceAccountTask } from "$/presentation/tasks";
import { mockWorkspaceAccount } from "mocks/domain/models";

export class MockAddWorkspaceAccountTask implements IAddWorkspaceAccountTask {
  constructor (
    public $add: IAddWorkspaceAccountTask.Result = { ...mockWorkspaceAccount }
  ) { }

  async add (
    _data: IAddWorkspaceAccountTask.Data
  ): Promise<IAddWorkspaceAccountTask.Result> {
    return this.$add;
  }
}
