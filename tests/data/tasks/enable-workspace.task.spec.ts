import { EnableWorkspaceTask } from "$/data/tasks";
import { IEnableWorkspaceTask } from "$/presentation/tasks";
import { MockEditWorkspaceRepo, MockGetWorkspaceRepo } from "mocks/data/repos";

const makeSut = (): {
  getWorkspace: MockGetWorkspaceRepo;
  editWorkspace: MockEditWorkspaceRepo;
  sut: EnableWorkspaceTask;
  data: IEnableWorkspaceTask.Data;
} => {
  const getWorkspace = new MockGetWorkspaceRepo();
  const editWorkspace = new MockEditWorkspaceRepo();
  getWorkspace.$get._removed = new Date();
  const sut = new EnableWorkspaceTask(
    getWorkspace,
    editWorkspace
  );
  const data: IEnableWorkspaceTask.Data = {
    id: "id"
  };
  return {
    getWorkspace,
    editWorkspace,
    sut,
    data
  };
};

describe("data/tasks/enable-workspace.task", () => {
  it("should throw if getWorkspace.get throws", async () => {
    const { getWorkspace, sut, data } = makeSut();
    jest.spyOn(getWorkspace, "get").mockRejectedValue(new Error());
    await expect(sut.enable(data)).rejects.toThrow();
  });

  it("should return undefined if getWorkspace.get return falsy", async () => {
    const { getWorkspace, sut, data } = makeSut();
    getWorkspace.$get = undefined;
    await expect(sut.enable(data)).resolves.toBeUndefined();
  });

  it("should return undefined if getWorkspace.get return enabled", async () => {
    const { getWorkspace, sut, data } = makeSut();
    getWorkspace.$get._removed = null;
    await expect(sut.enable(data)).resolves.toBeUndefined();
  });

  it("should throw if editWorkspace.edit throws", async () => {
    const { editWorkspace, sut, data } = makeSut();
    jest.spyOn(editWorkspace, "edit").mockRejectedValue(new Error());
    await expect(sut.enable(data)).rejects.toThrow();
  });

  it("should return enabled workspace", async () => {
    const { getWorkspace, sut, data } = makeSut();
    const result = await sut.enable(data);
    expect(result._id).toBe(getWorkspace.$get._id);
    expect(result._timestamp).not.toBe(getWorkspace.$get._timestamp);
    expect(result._created).toBe(getWorkspace.$get._created);
    expect(result._removed).toBeNull();
    expect(result.name).toBe(getWorkspace.$get.name);
    expect(result.ownerCnpj).toBe(getWorkspace.$get.ownerCnpj);
  });
});
