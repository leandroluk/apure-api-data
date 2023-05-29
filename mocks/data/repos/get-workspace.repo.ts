import { IGetWorkspaceRepo } from "$/data/repos";
import { mockWorkspace } from "mocks/domain/models";

export class MockGetWorkspaceRepo implements IGetWorkspaceRepo {
  constructor (
    public $get: IGetWorkspaceRepo.Result = { ...mockWorkspace }
  ) { }

  async get (
    _id: IGetWorkspaceRepo.Id
  ): Promise<IGetWorkspaceRepo.Result> {
    return this.$get;
  }
}
