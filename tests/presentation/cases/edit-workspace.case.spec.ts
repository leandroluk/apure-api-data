import { IEditWorkspaceCase } from "$/domain/cases";
import { EditWorkspaceCase } from "$/presentation/cases";
import { NotFoundError, UnauthorizedError } from "$/presentation/errors";
import { mockAuthenticatedHeader } from "mocks/domain/generics";
import { mockWorkspace } from "mocks/domain/models";
import { MockAuthorizeRequestTask, MockEditWorkspaceTask } from "mocks/presentation/tasks";

const makeSut = (): {
  authorizeRequest: MockAuthorizeRequestTask;
  editWorkspace: MockEditWorkspaceTask;
  sut: EditWorkspaceCase;
  data: IEditWorkspaceCase.Data;
} => {
  const authorizeRequest = new MockAuthorizeRequestTask();
  const editWorkspace = new MockEditWorkspaceTask();
  const sut = new EditWorkspaceCase(
    authorizeRequest,
    editWorkspace
  );
  const data: IEditWorkspaceCase.Data = {
    headers: { ...mockAuthenticatedHeader, sid: "sid" },
    params: {
      workspace_id: mockWorkspace._id
    },
    body: {
      name: "edited name",
      ownerCnpj: "edited ownerCnpj"
    }
  };

  return {
    authorizeRequest,
    editWorkspace,
    sut,
    data
  };
};

describe("presentation/cases/edit-workspace.case", () => {
  it("should throw if authorizeRequest.authorize throws", async () => {
    const { authorizeRequest, sut, data } = makeSut();
    jest.spyOn(authorizeRequest, "authorize").mockRejectedValue(new Error());
    await expect(sut.edit(data)).rejects.toThrow();
  });

  it("should throw UnauthorizedError if no authorized", async () => {
    const { authorizeRequest, sut, data } = makeSut();
    authorizeRequest.$authorize = undefined;
    await expect(sut.edit(data)).rejects.toThrowError(UnauthorizedError);
  });

  it("should throw if editWorkspace.edit throws", async () => {
    const { editWorkspace, sut, data } = makeSut();
    jest.spyOn(editWorkspace, "edit").mockRejectedValue(new Error());
    await expect(sut.edit(data)).rejects.toThrow();
  });

  it("should throw NotFoundError if no edit workspace", async () => {
    const { editWorkspace, sut, data } = makeSut();
    editWorkspace.$edit = undefined;
    await expect(sut.edit(data)).rejects.toThrowError(NotFoundError);
  });

  it("should return edited workspace", async () => {
    const { sut, data } = makeSut();
    await expect(sut.edit(data)).resolves.toBeUndefined();
  });
});
