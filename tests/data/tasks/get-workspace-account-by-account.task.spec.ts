import { GetWorkspaceAccountByAccountTask } from "$/data/tasks";
import { IGetWorkspaceAccountByAccountTask } from "$/presentation/tasks";
import { MockGetWorkspaceAccountByAccountRepo } from "mocks/data/repos";

const makeSut = (): {
  getWorkspaceAccountByAccount: MockGetWorkspaceAccountByAccountRepo;
  sut: GetWorkspaceAccountByAccountTask;
  data: IGetWorkspaceAccountByAccountTask.Data;
} => {
  const getWorkspaceAccountByAccount = new MockGetWorkspaceAccountByAccountRepo();
  const sut = new GetWorkspaceAccountByAccountTask(
    getWorkspaceAccountByAccount
  );
  const data: IGetWorkspaceAccountByAccountTask.Data = {
    account_id: "account_id",
    workspace_id: "workspace_id"
  };
  return {
    getWorkspaceAccountByAccount,
    sut,
    data
  };
};

describe("data/tasks/get-workspace-account-by-account.task", () => {
  it("should throw if getWorkspaceAccountByAccount.get throws", async () => {
    const { getWorkspaceAccountByAccount, sut, data } = makeSut();
    jest.spyOn(getWorkspaceAccountByAccount, "get").mockRejectedValue(new Error());
    await expect(sut.get(data)).rejects.toThrow();
  });

  it("should return workspaceAccount", async () => {
    const { getWorkspaceAccountByAccount, sut, data } = makeSut();
    await expect(sut.get(data)).resolves.toMatchObject(getWorkspaceAccountByAccount.$get);
  });
});
