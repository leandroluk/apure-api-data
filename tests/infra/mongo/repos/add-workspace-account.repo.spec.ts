import { IAddWorkspaceAccountRepo } from "$/data/repos";
import { MongoAddWorkspaceAccountRepo, mongoHelper } from "$/infra/mongo";
import { mockWorkspaceAccount } from "mocks/domain/models";

const makeSut = (): {
  sut: MongoAddWorkspaceAccountRepo;
  data: IAddWorkspaceAccountRepo.Data;
} => {
  const sut = new MongoAddWorkspaceAccountRepo();
  const data: IAddWorkspaceAccountRepo.Data = { ...mockWorkspaceAccount };
  return {
    sut,
    data
  };
};

describe("tests/infra/mongo/repos/add-workspace-account.repo", () => {
  it("should throw if mongoHelper.collection throws", async () => {
    const { sut, data } = makeSut();
    jest.spyOn(mongoHelper, "collection")
      .mockReturnValueOnce({ insertOne: throwFn } as any);
    await expect(sut.add(data)).rejects.toThrow();
  });

  it("should return if add account", async () => {
    const { sut, data } = makeSut();
    jest.spyOn(mongoHelper, "collection")
      .mockReturnValueOnce({ insertOne: np } as any);
    await expect(sut.add(data)).resolves.toBeUndefined();
  });
});
