import { IAddWorkspaceAccountRepo } from "$/data/repos";

export class MockAddWorkspaceAccountRepo implements IAddWorkspaceAccountRepo {
  async add (
    _data: IAddWorkspaceAccountRepo.Data
  ): Promise<void> {
  }
}
