import { IAuthorizeRequestTask } from "$/presentation/tasks";
import { mockAccount } from "mocks/domain/models";

export class MockAuthorizeRequestTask implements IAuthorizeRequestTask {
  constructor (
    public $authorize: IAuthorizeRequestTask.Result = { ...mockAccount }
  ) { }

  async authorize (
    _token: IAuthorizeRequestTask.Token
  ): Promise<IAuthorizeRequestTask.Result> {
    return this.$authorize;
  }
}
