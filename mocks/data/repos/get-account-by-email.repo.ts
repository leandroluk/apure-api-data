import { IGetAccountByEmailRepo } from "$/data/repos";
import { mockAccount } from "mocks/domain/models/account";

export class MockGetAccountByEmailRepo implements IGetAccountByEmailRepo {
  constructor (
    public $get: IGetAccountByEmailRepo.Result = { ...mockAccount }
  ) { }

  async get (_email: IGetAccountByEmailRepo.Email): Promise<IGetAccountByEmailRepo.Result> {
    return this.$get;
  }
}
