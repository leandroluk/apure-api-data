import { IGetWorkspaceTask } from "$/presentation/tasks";
import { mockWorkspace } from "mocks/domain/models";

export class MockGetWorkspaceTask implements IGetWorkspaceTask {
  constructor (
    public $get: IGetWorkspaceTask.Result = { ...mockWorkspace }
  ) { }

  async get (_id: IGetWorkspaceTask.Id): Promise<IGetWorkspaceTask.Result> {
    return this.$get;
  }
}
