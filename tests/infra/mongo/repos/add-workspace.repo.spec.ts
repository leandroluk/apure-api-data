import { IAddWorkspaceRepo } from "$/data/repos";
import { mongoHelper } from "$/infra/mongo";
import { MongoAddWorkspaceRepo } from "$/infra/mongo/repos/add-workspace.repo";
import { mockWorkspace } from "mocks/domain/models";

const makeSut = (): {
  sut: MongoAddWorkspaceRepo;
  data: IAddWorkspaceRepo.Data;
} => {
  const sut = new MongoAddWorkspaceRepo();
  const data: IAddWorkspaceRepo.Data = { ...mockWorkspace };
  return {
    sut,
    data
  };
};

describe("tests/infra/mongo/repos/add-workspace.repo.ts", () => {
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
