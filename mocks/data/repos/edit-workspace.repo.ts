import { IEditWorkspaceRepo } from "$/data/repos";

export class MockEditWorkspaceRepo implements IEditWorkspaceRepo {
  async edit (_data: IEditWorkspaceRepo.Data): Promise<void> {
  }
}
