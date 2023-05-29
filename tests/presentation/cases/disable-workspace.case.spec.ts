import { IDisableWorkspaceCase } from "$/domain/cases";
import { DisableWorkspaceCase } from "$/presentation/cases";
import { NotFoundError, UnauthorizedError } from "$/presentation/errors";
import { mockAuthenticatedHeader } from "mocks/domain/generics";
import { mockWorkspace } from "mocks/domain/models";
import { MockAuthorizeRequestTask, MockDisableWorkspaceTask } from "mocks/presentation/tasks";

const makeSut = (): {
  authorizeRequest: MockAuthorizeRequestTask;
  disableWorkspace: MockDisableWorkspaceTask;
  sut: DisableWorkspaceCase;
  data: IDisableWorkspaceCase.Data;
} => {
  const authorizeRequest = new MockAuthorizeRequestTask();
  const disableWorkspace = new MockDisableWorkspaceTask();
  const sut = new DisableWorkspaceCase(
    authorizeRequest,
    disableWorkspace
  );
  const data: IDisableWorkspaceCase.Data = {
    headers: mockAuthenticatedHeader,
    params: {
      _id: mockWorkspace._id
    }
  };
  return {
    authorizeRequest,
    disableWorkspace,
    sut,
    data
  };
};

describe("presentation/cases/disable-workspace.case", () => {
  it("should throw if authorizeRequest.authorize throws", async () => {
    const { authorizeRequest, sut, data } = makeSut();
    jest.spyOn(authorizeRequest, "authorize").mockRejectedValue(new Error());
    await expect(sut.disable(data)).rejects.toThrow();
  });

  it("should throw UnauthorizedError if authorizeRequest.authorize returns falsy", async () => {
    const { authorizeRequest, sut, data } = makeSut();
    authorizeRequest.$authorize = undefined;
    await expect(sut.disable(data)).rejects.toThrowError(UnauthorizedError);
  });

  it("should throw if disableWorkspace.disable throws", async () => {
    const { disableWorkspace, sut, data } = makeSut();
    jest.spyOn(disableWorkspace, "disable").mockRejectedValue(new Error());
    await expect(sut.disable(data)).rejects.toThrow();
  });

  it("should throw NotFoundError if disableWorkspace.disable returns falsy", async () => {
    const { disableWorkspace, sut, data } = makeSut();
    disableWorkspace.$disable = false;
    await expect(sut.disable(data)).rejects.toThrowError(NotFoundError);
  });

  it("should return if disable workspace", async () => {
    const { sut, data } = makeSut();
    await expect(sut.disable(data)).resolves.toBeUndefined();
  });
});
