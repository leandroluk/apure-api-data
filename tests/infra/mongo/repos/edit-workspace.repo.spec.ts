import { IEditWorkspaceRepo } from "$/data/repos";
import { MongoEditWorkspaceRepo, mongoHelper } from "$/infra/mongo";

const makeSut = (): {
  sut: MongoEditWorkspaceRepo;
  id: IEditWorkspaceRepo.Id;
  changes: IEditWorkspaceRepo.Changes;
} => {
  const sut = new MongoEditWorkspaceRepo();
  const id: IEditWorkspaceRepo.Id = "id";
  const changes: IEditWorkspaceRepo.Changes = {};
  return {
    sut,
    id,
    changes
  };
};

describe("infra/adapters/edit-workspace.repo", () => {
  it("should throw if mongoHelper.collection throws", async () => {
    const { sut, id, changes } = makeSut();
    jest.spyOn(mongoHelper, "collection")
      .mockReturnValueOnce({ findOneAndUpdate: throwFn } as any);
    await expect(sut.edit(id, changes)).rejects.toThrow();
  });

  it("should return if edit accountLock", async () => {
    const { sut, id, changes } = makeSut();
    jest.spyOn(mongoHelper, "collection")
      .mockReturnValueOnce({ findOneAndUpdate: np } as any);
    await expect(sut.edit(id, changes)).resolves.toBeUndefined();
  });
});
