import { IEditWorkspaceTask } from "$/presentation/tasks";
import { mockWorkspace } from "mocks/domain/models";

export class MockEditWorkspaceTask implements IEditWorkspaceTask {
  constructor (
    public $edit: IEditWorkspaceTask.Result = { ...mockWorkspace }
  ) { }

  async edit (
    _id: IEditWorkspaceTask.Id,
    _changes: IEditWorkspaceTask.Changes): Promise<IEditWorkspaceTask.Result> {
    return this.$edit;
  }
}
