import { IGetAccountRepo } from "$/data/repos";
import { mockAccount } from "mocks/domain/models";

export class MockGetAccountRepo implements IGetAccountRepo {
  constructor (
    public $get: IGetAccountRepo.Result = { ...mockAccount }
  ) { }

  async get (_id: IGetAccountRepo.Id): Promise<IGetAccountRepo.Result> {
    return this.$get;
  }
}
