import { IAddWorkspaceCase } from "$/domain/cases";
import { AddWorkspaceCase } from "$/presentation/cases";
import { UnauthorizedError } from "$/presentation/errors";
import { MockAddWorkspaceTask, MockAuthorizeRequestTask } from "mocks/presentation/tasks";

const makeSut = (): {
  authorizeRequest: MockAuthorizeRequestTask;
  addWorkspace: MockAddWorkspaceTask;
  sut: AddWorkspaceCase;
  data: IAddWorkspaceCase.Data;
} => {
  const authorizeRequest = new MockAuthorizeRequestTask();
  const addWorkspace = new MockAddWorkspaceTask();
  const sut = new AddWorkspaceCase(
    authorizeRequest,
    addWorkspace
  );
  const data: IAddWorkspaceCase.Data = {
    headers: {
      authorization: "authorization"
    },
    body: {
      name: "name",
      ownerCnpj: "ownerCnpj"
    }
  };
  return {
    authorizeRequest,
    addWorkspace,
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

  it("should return added workspace", async () => {
    const { addWorkspace, sut, data } = makeSut();
    await expect(sut.add(data)).resolves.toMatchObject(addWorkspace.$add);
  });
});
