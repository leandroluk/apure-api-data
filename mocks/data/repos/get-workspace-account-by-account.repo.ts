import { IGetWorkspaceAccountByAccountRepo } from "$/data/repos";
import { mockWorkspaceAccount } from "mocks/domain/models";

export class MockGetWorkspaceAccountByAccountRepo implements IGetWorkspaceAccountByAccountRepo {
  constructor (
    public $get: IGetWorkspaceAccountByAccountRepo.Result = { ...mockWorkspaceAccount }
  ) { }

  async get (_data: IGetWorkspaceAccountByAccountRepo.Data): Promise<IGetWorkspaceAccountByAccountRepo.Result> {
    return this.$get;
  }
}
