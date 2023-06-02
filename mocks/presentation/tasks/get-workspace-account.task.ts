import { IGetWorkspaceAccountByAccountTask } from "$/presentation/tasks";
import { mockWorkspaceAccount } from "mocks/domain/models";

export class MockGetWorkspaceAccountByAccountTask implements IGetWorkspaceAccountByAccountTask {
  constructor (
    public $get: IGetWorkspaceAccountByAccountTask.Result = { ...mockWorkspaceAccount }
  ) { }

  async get (_data: IGetWorkspaceAccountByAccountTask.Data): Promise<IGetWorkspaceAccountByAccountTask.Result> {
    return this.$get;
  }
}
