import { IEditWorkspaceTask } from "$/presentation/tasks";
import { mockWorkspace } from "mocks/domain/models";

export class MockEditWorkspaceTask implements IEditWorkspaceTask {
  constructor (
    public $edit: IEditWorkspaceTask.Result = { ...mockWorkspace }
  ) { }

  async edit (
    _data: IEditWorkspaceTask.Data
  ): Promise<IEditWorkspaceTask.Result> {
    return this.$edit;
  }
}
