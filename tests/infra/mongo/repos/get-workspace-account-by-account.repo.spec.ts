import { IGetWorkspaceAccountByAccountRepo } from "$/data/repos";
import { MongoGetWorkspaceAccountByAccountRepo, mongoHelper } from "$/infra/mongo";
import { mockWorkspace } from "mocks/domain/models";

const makeSut = (): {
  sut: MongoGetWorkspaceAccountByAccountRepo;
  data: IGetWorkspaceAccountByAccountRepo.Data;
} => {
  const sut = new MongoGetWorkspaceAccountByAccountRepo();
  const data: IGetWorkspaceAccountByAccountRepo.Data = {
    account_id: "account_id",
    workspace_id: "workspace_id"
  };
  return {
    sut,
    data
  };
};

describe("tests/infra/mongo/repos/get-workspace-account-by-account.repo", () => {
  it("should throw if mongoHelper.collection throws", async () => {
    const { sut, data } = makeSut();
    jest.spyOn(mongoHelper, "collection")
      .mockReturnValueOnce({ find: np({ project: np({ toArray: throwFn }) }) } as any);
    await expect(sut.get(data)).rejects.toThrow();
  });

  it("should return workspace", async () => {
    const { sut, data } = makeSut();
    jest.spyOn(mongoHelper, "collection")
      .mockReturnValueOnce({ find: np({ project: np({ toArray: np([{ ...mockWorkspace }]) }) }) } as any);
    await expect(sut.get(data)).resolves.toEqual(mockWorkspace);
  });
});
