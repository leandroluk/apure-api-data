import { GetAccountTask } from "$/data/tasks";
import { IGetAccountTask } from "$/presentation/tasks";
import { MockGetAccountRepo } from "mocks/data/repos";

const makeSut = (): {
  getAccount: MockGetAccountRepo;
  sut: GetAccountTask;
  id: IGetAccountTask.Id;
} => {
  const getAccount = new MockGetAccountRepo();
  const sut = new GetAccountTask(
    getAccount
  );
  const id: IGetAccountTask.Id = "id";
  return {
    getAccount,
    sut,
    id
  };
};

describe("data/tasks/get-account.task", () => {
  it("should throw if getAccount.get throws", async () => {
    const { getAccount, sut, id } = makeSut();
    jest.spyOn(getAccount, "get").mockRejectedValue(new Error());
    await expect(sut.get(id)).rejects.toThrow();
  });

  it("should return account", async () => {
    const { getAccount, sut, id } = makeSut();
    await expect(sut.get(id)).resolves.toMatchObject(getAccount.$get);
  });
});
