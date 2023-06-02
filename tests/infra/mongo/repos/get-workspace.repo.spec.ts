import { IGetWorkspaceRepo } from "$/data/repos";
import { MongoGetWorkspaceRepo, mongoHelper } from "$/infra/mongo";
import { mockWorkspace } from "mocks/domain/models";

const makeSut = (): {
  sut: MongoGetWorkspaceRepo;
  id: IGetWorkspaceRepo.Id;
} => {
  const sut = new MongoGetWorkspaceRepo();
  const id: IGetWorkspaceRepo.Id = "id";
  return {
    sut,
    id
  };
};

describe("tests/infra/mongo/repos/get-workspace.repo", () => {
  it("should throw if mongoHelper.collection throws", async () => {
    const { sut, id } = makeSut();
    jest.spyOn(mongoHelper, "collection")
      .mockReturnValueOnce({ find: np({ project: np({ toArray: throwFn }) }) } as any);
    await expect(sut.get(id)).rejects.toThrow();
  });

  it("should return workspace", async () => {
    const { sut, id } = makeSut();
    jest.spyOn(mongoHelper, "collection")
      .mockReturnValueOnce({ find: np({ project: np({ toArray: np([{ ...mockWorkspace }]) }) }) } as any);
    await expect(sut.get(id)).resolves.toEqual(mockWorkspace);
  });
});
