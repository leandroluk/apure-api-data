import { AddWorkspaceAccountTask } from "$/data/tasks";
import { IAddWorkspaceAccountTask } from "$/presentation/tasks";
import { MockCreateUuidAdapter } from "mocks/data/adapters";
import { MockAddWorkspaceAccountRepo } from "mocks/data/repos";

const makeSut = (): {
  createUuid: MockCreateUuidAdapter;
  addWorkspaceAccount: MockAddWorkspaceAccountRepo;
  sut: AddWorkspaceAccountTask;
  data: IAddWorkspaceAccountTask.Data;
} => {
  const createUuid = new MockCreateUuidAdapter();
  const addWorkspaceAccount = new MockAddWorkspaceAccountRepo();
  const sut = new AddWorkspaceAccountTask(
    createUuid,
    addWorkspaceAccount
  );
  const data: IAddWorkspaceAccountTask.Data = {
    account_id: "account_id",
    roles: ["admin"],
    workspace_id: "workspace_id"
  };
  return {
    createUuid,
    addWorkspaceAccount,
    sut,
    data
  };
};

describe("data/tasks/add-workspace-account.task", () => {
  it("should throw if createUuid.create throws", async () => {
    const { createUuid, sut, data } = makeSut();
    jest.spyOn(createUuid, "create").mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it("should throw if addWorkspaceAccount.add throws", async () => {
    const { addWorkspaceAccount, sut, data } = makeSut();
    jest.spyOn(addWorkspaceAccount, "add").mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it("should return added workspace", async () => {
    const { createUuid, sut, data } = makeSut();
    const result = await sut.add(data);
    expect(result._id).toBe(createUuid.$create);
    expect(result._timestamp).toBeDefined();
    expect(result._created).toBeDefined();
    expect(result._removed).toBeFalsy();
    expect(result.account_id).toBe(data.account_id);
    expect(result.workspace_id).toBe(data.workspace_id);
    expect(result.roles).toBe(data.roles);
  });
});
