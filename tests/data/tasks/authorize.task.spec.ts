import { AuthorizeTask } from "$/data/tasks";
import { IAuthorizeRequestTask } from "$/presentation/tasks";
import { MockCheckJwtAdapter, MockDecrypterAdapter } from "mocks/data/adapters";
import { MockGetAccountByEmailRepo } from "mocks/data/repos";

const makeSut = (): {
  decrypter: MockDecrypterAdapter;
  checkJwt: MockCheckJwtAdapter;
  getAccountByEmail: MockGetAccountByEmailRepo;
  sut: AuthorizeTask;
  token: IAuthorizeRequestTask.Token;
} => {
  const decrypter = new MockDecrypterAdapter();
  const checkJwt = new MockCheckJwtAdapter();
  const getAccountByEmail = new MockGetAccountByEmailRepo();
  const sut = new AuthorizeTask(
    decrypter,
    checkJwt,
    getAccountByEmail
  );
  const token: IAuthorizeRequestTask.Token = "token";
  return {
    decrypter,
    checkJwt,
    getAccountByEmail,
    sut,
    token
  };
};

describe("data/tasks/authorize.task", () => {
  it("should should throw if decrypter.decrypt throws", async () => {
    const { decrypter, sut, token } = makeSut();
    jest.spyOn(decrypter, "decrypt").mockRejectedValue(new Error());
    await expect(sut.authorize(token)).rejects.toThrow();
  });

  it("should return undefined if decrypter.decrypt returns falsy", async () => {
    const { decrypter, sut, token } = makeSut();
    decrypter.$decript = undefined;
    await expect(sut.authorize(token)).resolves.toBeUndefined();
  });

  it("should throw if checkJwt.check throws", async () => {
    const { checkJwt, sut, token } = makeSut();
    jest.spyOn(checkJwt, "check").mockRejectedValue(new Error());
    await expect(sut.authorize(token)).rejects.toThrow();
  });

  it("should return undefined if checkJwt.check returns falsy", async () => {
    const { checkJwt, sut, token } = makeSut();
    checkJwt.$check = undefined;
    await expect(sut.authorize(token)).resolves.toBeUndefined();
  });

  it("should return undefined if checkJwt.check no return a 'access' type", async () => {
    const { checkJwt, sut, token } = makeSut();
    checkJwt.$check.type = "refresh";
    await expect(sut.authorize(token)).resolves.toBeUndefined();
  });

  it("should throw if getAccountByEmail.get throws", async () => {
    const { getAccountByEmail, sut, token } = makeSut();
    jest.spyOn(getAccountByEmail, "get").mockRejectedValue(new Error());
    await expect(sut.authorize(token)).rejects.toThrow();
  });

  it("should return account if success", async () => {
    const { getAccountByEmail, sut, token } = makeSut();
    await expect(sut.authorize(token)).resolves.toMatchObject(getAccountByEmail.$get);
  });
});
