import { IGetAccountRepo } from "$/data/repos";
import { MongoGetAccountRepo, mongoHelper } from "$/infra/mongo";
import { mockWorkspace } from "mocks/domain/models";

const makeSut = (): {
  sut: MongoGetAccountRepo;
  id: IGetAccountRepo.Id;
} => {
  const sut = new MongoGetAccountRepo();
  const id: IGetAccountRepo.Id = "id";
  return {
    sut,
    id
  };
};

describe("tests/infra/mongo/repos/get-account.repo", () => {
  it("should throw if mongoHelper.collection throws", async () => {
    const { sut, id } = makeSut();
    jest.spyOn(mongoHelper, "collection")
      .mockReturnValueOnce({ find: np({ project: np({ toArray: throwFn }) }) } as any);
    await expect(sut.get(id)).rejects.toThrow();
  });

  it("should return account", async () => {
    const { sut, id } = makeSut();
    jest.spyOn(mongoHelper, "collection")
      .mockReturnValueOnce({ find: np({ project: np({ toArray: np([{ ...mockWorkspace }]) }) }) } as any);
    await expect(sut.get(id)).resolves.toEqual(mockWorkspace);
  });
});
