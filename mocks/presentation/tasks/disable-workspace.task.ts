import { IDisableWorkspaceTask } from "$/presentation/tasks";

export class MockDisableWorkspaceTask implements IDisableWorkspaceTask {
  constructor (
    public $disable: IDisableWorkspaceTask.Result = true
  ) { }

  async disable (
    _id: IDisableWorkspaceTask.Id
  ): Promise<boolean> {
    return this.$disable;
  }
}
