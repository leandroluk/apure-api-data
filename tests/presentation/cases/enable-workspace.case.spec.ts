import { IEnableWorkspaceCase } from "$/domain/cases";
import { EnableWorkspaceCase } from "$/presentation/cases";
import { NotFoundError, UnauthorizedError } from "$/presentation/errors";
import { mockAuthenticatedHeader } from "mocks/domain/generics";
import { mockWorkspace } from "mocks/domain/models";
import { MockAuthorizeRequestTask, MockEnableWorkspaceTask } from "mocks/presentation/tasks";

const makeSut = (): {
  authorizeRequest: MockAuthorizeRequestTask;
  enableWorkspace: MockEnableWorkspaceTask;
  sut: EnableWorkspaceCase;
  data: IEnableWorkspaceCase.Data;
} => {
  const authorizeRequest = new MockAuthorizeRequestTask();
  const enableWorkspace = new MockEnableWorkspaceTask();
  const sut = new EnableWorkspaceCase(
    authorizeRequest,
    enableWorkspace
  );
  const data: IEnableWorkspaceCase.Data = {
    headers: mockAuthenticatedHeader,
    params: {
      _id: mockWorkspace._id
    }
  };
  return {
    authorizeRequest,
    enableWorkspace,
    sut,
    data
  };
};

describe("presentation/cases/enable-workspace.case", () => {
  it("should throw if authorizeRequest.authorize throws", async () => {
    const { authorizeRequest, sut, data } = makeSut();
    jest.spyOn(authorizeRequest, "authorize").mockRejectedValue(new Error());
    await expect(sut.enable(data)).rejects.toThrow();
  });

  it("should throw UnauthorizedError if authorizeRequest.authorize returns falsy", async () => {
    const { authorizeRequest, sut, data } = makeSut();
    authorizeRequest.$authorize = undefined;
    await expect(sut.enable(data)).rejects.toThrowError(UnauthorizedError);
  });

  it("should throw if enableWorkspace.enable throws", async () => {
    const { enableWorkspace, sut, data } = makeSut();
    jest.spyOn(enableWorkspace, "enable").mockRejectedValue(new Error());
    await expect(sut.enable(data)).rejects.toThrow();
  });

  it("should throw NotFoundError if enableWorkspace.enable returns falsy", async () => {
    const { enableWorkspace, sut, data } = makeSut();
    enableWorkspace.$enable = undefined;
    await expect(sut.enable(data)).rejects.toThrowError(NotFoundError);
  });

  it("should return if enable workspace", async () => {
    const { enableWorkspace, sut, data } = makeSut();
    await expect(sut.enable(data)).resolves.toMatchObject(enableWorkspace.$enable);
  });
});
