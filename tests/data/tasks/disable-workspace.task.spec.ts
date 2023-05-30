import { DisableWorkspaceTask } from "$/data/tasks";
import { IDisableWorkspaceTask } from "$/presentation/tasks";
import { MockEditWorkspaceRepo, MockGetWorkspaceRepo } from "mocks/data/repos";

const makeSut = (): {
  getWorkspace: MockGetWorkspaceRepo;
  editWorkspace: MockEditWorkspaceRepo;
  sut: DisableWorkspaceTask;
  data: IDisableWorkspaceTask.Data;
} => {
  const getWorkspace = new MockGetWorkspaceRepo();
  const editWorkspace = new MockEditWorkspaceRepo();
  const sut = new DisableWorkspaceTask(
    getWorkspace,
    editWorkspace
  );
  const data: IDisableWorkspaceTask.Data = {
    id: "id"
  };
  return {
    getWorkspace,
    editWorkspace,
    sut,
    data
  };
};

describe("data/tasks/disable-workspace.task", () => {
  it("should throw if getWorkspace.get throws", async () => {
    const { getWorkspace, sut, data } = makeSut();
    jest.spyOn(getWorkspace, "get").mockRejectedValue(new Error());
    await expect(sut.disable(data)).rejects.toThrow();
  });

  it("should return false if getWorkspace.get returns falsy", async () => {
    const { getWorkspace, sut, data } = makeSut();
    getWorkspace.$get = undefined;
    await expect(sut.disable(data)).resolves.toBe(false);
  });

  it("should return false if getWorkspace.returns removed", async () => {
    const { getWorkspace, sut, data } = makeSut();
    getWorkspace.$get._removed = new Date();
    await expect(sut.disable(data)).resolves.toBe(false);
  });

  it("should throws if editWorkspace.edit throws", async () => {
    const { editWorkspace, sut, data } = makeSut();
    jest.spyOn(editWorkspace, "edit").mockRejectedValue(new Error());
    await expect(sut.disable(data)).rejects.toThrow();
  });

  it("should return true if disable workspace", async () => {
    const { sut, data } = makeSut();
    await expect(sut.disable(data)).resolves.toBe(true);
  });
});
