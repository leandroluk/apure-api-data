import { IGetAccountTask } from "$/presentation/tasks";
import { mockAccount } from "mocks/domain/models";

export class MockGetAccountTask implements IGetAccountTask {
  constructor (
    public $get: IGetAccountTask.Result = { ...mockAccount }
  ) { }

  async get (_id: IGetAccountTask.Id): Promise<IGetAccountTask.Result> {
    return this.$get;
  }
}
