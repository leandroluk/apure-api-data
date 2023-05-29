import { IGetAccountByEmailRepo } from "$/data/repos";
import { mongoHelper } from "$/infra/mongo";
import { MongoGetAccountByEmailRepo } from "$/infra/mongo/repos/get-account-by-email.repo";
import { mockAccount } from "mocks/domain/models";

const makeSut = (): {
  sut: MongoGetAccountByEmailRepo;
  email: IGetAccountByEmailRepo.Email;
} => {
  const sut = new MongoGetAccountByEmailRepo();
  const email: IGetAccountByEmailRepo.Email = "email";
  return {
    sut,
    email
  };
};

describe("tests/infra/mongo/repos/get-account-by-email.repo", () => {
  it("should throw if mongoHelper.collection throws", async () => {
    const { sut, email } = makeSut();
    jest.spyOn(mongoHelper, "collection")
      .mockReturnValueOnce({ find: np({ project: np({ toArray: throwFn }) }) } as any);
    await expect(sut.get(email)).rejects.toThrow();
  });

  it("should return account", async () => {
    const { sut, email } = makeSut();
    jest.spyOn(mongoHelper, "collection")
      .mockReturnValueOnce({ find: np({ project: np({ toArray: np([{ ...mockAccount }]) }) }) } as any);
    await expect(sut.get(email)).resolves.toEqual(mockAccount);
  });
});
