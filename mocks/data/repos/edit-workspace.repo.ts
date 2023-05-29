import { IEditWorkspaceRepo } from "$/data/repos";

export class MockEditWorkspaceRepo implements IEditWorkspaceRepo {
  async edit (
    _id: IEditWorkspaceRepo.Id,
    _changes: IEditWorkspaceRepo.Changes
  ): Promise<void> {
  }
}
