import { IEditWorkspaceRepo } from "$/data/repos";
import { MongoEditWorkspaceRepo, mongoHelper } from "$/infra/mongo";

const makeSut = (): {
  sut: MongoEditWorkspaceRepo;
  data: IEditWorkspaceRepo.Data;
} => {
  const sut = new MongoEditWorkspaceRepo();
  const data: IEditWorkspaceRepo.Data = {
    id: "id",
    changes: {}
  };
  return {
    sut,
    data
  };
};

describe("infra/adapters/edit-workspace.repo", () => {
  it("should throw if mongoHelper.collection throws", async () => {
    const { sut, data } = makeSut();
    jest.spyOn(mongoHelper, "collection")
      .mockReturnValueOnce({ findOneAndUpdate: throwFn } as any);
    await expect(sut.edit(data)).rejects.toThrow();
  });

  it("should return if edit accountLock", async () => {
    const { sut, data } = makeSut();
    jest.spyOn(mongoHelper, "collection")
      .mockReturnValueOnce({ findOneAndUpdate: np } as any);
    await expect(sut.edit(data)).resolves.toBeUndefined();
  });
});
