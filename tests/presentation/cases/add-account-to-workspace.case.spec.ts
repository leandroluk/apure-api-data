import { IAddAccountToWorkspaceCase } from "$/domain/cases";
import { IWorkspaceAccount } from "$/domain/models";
import { AddAccountToWorkspaceCase } from "$/presentation/cases";
import { NotFoundError, UnauthorizedError } from "$/presentation/errors";
import { mockAuthenticatedHeader } from "mocks/domain/generics";
import {
  MockAddWorkspaceAccountTask,
  MockAuthorizeRequestTask,
  MockGetAccountTask,
  MockGetWorkspaceAccountByAccountTask,
  MockGetWorkspaceTask
} from "mocks/presentation/tasks";

const makeSut = (): {
  authorizeRequest: MockAuthorizeRequestTask;
  getAccount: MockGetAccountTask;
  getWorkspace: MockGetWorkspaceTask;
  getWorkspaceAccountByAccount: MockGetWorkspaceAccountByAccountTask;
  addWorkspaceAccount: MockAddWorkspaceAccountTask;
  sut: AddAccountToWorkspaceCase;
  data: IAddAccountToWorkspaceCase.Data;
} => {
  const authorizeRequest = new MockAuthorizeRequestTask();
  const getAccount = new MockGetAccountTask();
  const getWorkspace = new MockGetWorkspaceTask();
  const getWorkspaceAccountByAccount = new MockGetWorkspaceAccountByAccountTask();
  const addWorkspaceAccount = new MockAddWorkspaceAccountTask();
  const sut = new AddAccountToWorkspaceCase(
    authorizeRequest,
    getAccount,
    getWorkspace,
    getWorkspaceAccountByAccount,
    addWorkspaceAccount
  );
  const data: IAddAccountToWorkspaceCase.Data = {
    headers: { ...mockAuthenticatedHeader, sid: "sid" },
    params: { workspace_id: "workspace_id" },
    body: {
      account_id: "account_id",
      roles: [IWorkspaceAccount.Role.Admin]
    }
  };
  return {
    authorizeRequest,
    getAccount,
    getWorkspace,
    getWorkspaceAccountByAccount,
    addWorkspaceAccount,
    sut,
    data
  };
};

describe("presentation/cases/add-account-to-workspace.case", () => {
  it("should throw if authorizeRequest.authorize throws", async () => {
    const { authorizeRequest, sut, data } = makeSut();
    jest.spyOn(authorizeRequest, "authorize").mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it("should throw UnauthorizedError if authorizeRequest.authorize returns falsy", async () => {
    const { authorizeRequest, sut, data } = makeSut();
    authorizeRequest.$authorize = undefined;
    await expect(sut.add(data)).rejects.toThrowError(UnauthorizedError);
  });

  it("should throw if getWorkspaceAccountByAccount.get throws", async () => {
    const { getWorkspaceAccountByAccount, sut, data } = makeSut();
    jest.spyOn(getWorkspaceAccountByAccount, "get").mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it("should throw ConflitError if getWorkspaceAccountByAccount.get no return a admin role", async () => {
    const { getWorkspaceAccountByAccount, sut, data } = makeSut();
    getWorkspaceAccountByAccount.$get.roles = [IWorkspaceAccount.Role.Viewer];
    await expect(sut.add(data)).rejects.toThrow();
  });

  it("should throw if getAccount.get throws", async () => {
    const { getAccount, sut, data } = makeSut();
    jest.spyOn(getAccount, "get").mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it("should throw if getWorkspace.get throws", async () => {
    const { getWorkspace, sut, data } = makeSut();
    jest.spyOn(getWorkspace, "get").mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it("should throw NotFoundError if getAccount.get returns falsy", async () => {
    const { getAccount, sut, data } = makeSut();
    getAccount.$get = undefined;
    await expect(sut.add(data)).rejects.toThrowError(NotFoundError);
  });

  it("should throw NotFoundError if getAccount.get returns removed", async () => {
    const { getAccount, sut, data } = makeSut();
    getAccount.$get._removed = new Date();
    await expect(sut.add(data)).rejects.toThrowError(NotFoundError);
  });

  it("should throw NotFoundError if getWorkspace.get returns falsy", async () => {
    const { getWorkspace, sut, data } = makeSut();
    getWorkspace.$get = undefined;
    await expect(sut.add(data)).rejects.toThrowError(NotFoundError);
  });

  it("should throw NotFoundError if getWorkspace.get returns removed", async () => {
    const { getWorkspace, sut, data } = makeSut();
    getWorkspace.$get._removed = new Date();
    await expect(sut.add(data)).rejects.toThrowError(NotFoundError);
  });

  it("should throw if addWorkspaceAccount.add throws", async () => {
    const { addWorkspaceAccount, sut, data } = makeSut();
    jest.spyOn(addWorkspaceAccount, "add").mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it("should return if add account to workspace", async () => {
    const { sut, data } = makeSut();
    await expect(sut.add(data)).resolves.toBeUndefined();
  });
});
