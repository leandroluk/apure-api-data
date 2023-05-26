import { IAddWorkspaceRepo } from "$/data/repos";

export class MockAddWorkspaceRepo implements IAddWorkspaceRepo {
  async add (
    _data: IAddWorkspaceRepo.Data
  ): Promise<void> {
  }
}
