import { DisableWorkspaceTask } from "$/data/tasks";
import { IDisableWorkspaceTask } from "$/presentation/tasks";
import { MockEditWorkspaceRepo, MockGetWorkspaceRepo } from "mocks/data/repos";

const makeSut = (): {
  getWorkspace: MockGetWorkspaceRepo;
  editWorkspace: MockEditWorkspaceRepo;
  sut: DisableWorkspaceTask;
  id: IDisableWorkspaceTask.Id;
} => {
  const getWorkspace = new MockGetWorkspaceRepo();
  const editWorkspace = new MockEditWorkspaceRepo();
  const sut = new DisableWorkspaceTask(
    getWorkspace,
    editWorkspace
  );
  const id: IDisableWorkspaceTask.Id = "id";
  return {
    getWorkspace,
    editWorkspace,
    sut,
    id
  };
};

describe("data/tasks/disable-workspace.task", () => {
  it("should throw if getWorkspace.get throws", async () => {
    const { getWorkspace, sut, id } = makeSut();
    jest.spyOn(getWorkspace, "get").mockRejectedValue(new Error());
    await expect(sut.disable(id)).rejects.toThrow();
  });

  it("should return false if getWorkspace.get returns falsy", async () => {
    const { getWorkspace, sut, id } = makeSut();
    getWorkspace.$get = undefined;
    await expect(sut.disable(id)).resolves.toBe(false);
  });

  it("should return false if getWorkspace.returns removed", async () => {
    const { getWorkspace, sut, id } = makeSut();
    getWorkspace.$get._removed = new Date();
    await expect(sut.disable(id)).resolves.toBe(false);
  });

  it("should throws if editWorkspace.edit throws", async () => {
    const { editWorkspace, sut, id } = makeSut();
    jest.spyOn(editWorkspace, "edit").mockRejectedValue(new Error());
    await expect(sut.disable(id)).rejects.toThrow();
  });

  it("should return true if disable workspace", async () => {
    const { sut, id } = makeSut();
    await expect(sut.disable(id)).resolves.toBe(true);
  });
});
