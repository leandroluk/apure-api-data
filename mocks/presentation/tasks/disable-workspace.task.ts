import { IDisableWorkspaceTask } from "$/presentation/tasks";

export class MockDisableWorkspaceTask implements IDisableWorkspaceTask {
  constructor (
    public $disable: IDisableWorkspaceTask.Result = true
  ) { }

  async disable (
    _data: IDisableWorkspaceTask.Data
  ): Promise<boolean> {
    return this.$disable;
  }
}
