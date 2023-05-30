import { IAddWorkspaceCase } from "$/domain/cases";
import { AddWorkspaceCase } from "$/presentation/cases";
import { UnauthorizedError } from "$/presentation/errors";
import { mockAuthenticatedHeader } from "mocks/domain/generics";
import { MockAddWorkspaceAccountTask, MockAddWorkspaceTask, MockAuthorizeRequestTask } from "mocks/presentation/tasks";

const makeSut = (): {
  authorizeRequest: MockAuthorizeRequestTask;
  addWorkspace: MockAddWorkspaceTask;
  addWorkspaceAccount: MockAddWorkspaceAccountTask;
  sut: AddWorkspaceCase;
  data: IAddWorkspaceCase.Data;
} => {
  const authorizeRequest = new MockAuthorizeRequestTask();
  const addWorkspace = new MockAddWorkspaceTask();
  const addWorkspaceAccount = new MockAddWorkspaceAccountTask();
  const sut = new AddWorkspaceCase(
    authorizeRequest,
    addWorkspace,
    addWorkspaceAccount
  );
  const data: IAddWorkspaceCase.Data = {
    headers: { ...mockAuthenticatedHeader, sid: "sid" },
    body: {
      name: "name",
      ownerCnpj: "ownerCnpj"
    }
  };
  return {
    authorizeRequest,
    addWorkspace,
    addWorkspaceAccount,
    sut,
    data
  };
};

describe("presentation/tasks/add-workspace.case", () => {
  it("should throw if authorizeRequest.authorize throws", async () => {
    const { authorizeRequest, sut, data } = makeSut();
    jest.spyOn(authorizeRequest, "authorize").mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it("should throw Unauthorized if authorizeRequest.authorize return falsy", async () => {
    const { authorizeRequest, sut, data } = makeSut();
    authorizeRequest.$authorize = undefined;
    await expect(sut.add(data)).rejects.toThrow(UnauthorizedError);
  });

  it("should throw if addWorkspace.add throws", async () => {
    const { addWorkspace, sut, data } = makeSut();
    jest.spyOn(addWorkspace, "add").mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it("should throw if addWorkspaceAccount.add throws", async () => {
    const { addWorkspaceAccount, sut, data } = makeSut();
    jest.spyOn(addWorkspaceAccount, "add").mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it("should return added workspace", async () => {
    const { addWorkspace, sut, data } = makeSut();
    await expect(sut.add(data)).resolves.toMatchObject(addWorkspace.$add);
  });
});
