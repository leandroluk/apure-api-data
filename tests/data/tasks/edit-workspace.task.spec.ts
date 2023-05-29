import { EditWorkspaceTask } from "$/data/tasks";
import { IEditWorkspaceTask } from "$/presentation/tasks";
import { MockEditWorkspaceRepo, MockGetWorkspaceRepo } from "mocks/data/repos";

const makeSut = (): {
  sut: EditWorkspaceTask;
  getWorkspace: MockGetWorkspaceRepo;
  editWorkspace: MockEditWorkspaceRepo;
  id: IEditWorkspaceTask.Id;
  changes: IEditWorkspaceTask.Changes;
} => {
  const getWorkspace = new MockGetWorkspaceRepo();
  const editWorkspace = new MockEditWorkspaceRepo();
  const sut = new EditWorkspaceTask(
    getWorkspace,
    editWorkspace
  );
  const id: IEditWorkspaceTask.Id = "id";
  const changes: IEditWorkspaceTask.Changes = {
    name: "edited name",
    ownerCnpj: "edited ownerCnpj"
  };
  return {
    getWorkspace,
    editWorkspace,
    sut,
    id,
    changes
  };
};

describe("data/tasks/edit-workspace.task", () => {
  it("should throw if getWorkspace.get throws", async () => {
    const { getWorkspace, sut, id, changes } = makeSut();
    jest.spyOn(getWorkspace, "get").mockRejectedValue(new Error());
    await expect(sut.edit(id, changes)).rejects.toThrow();
  });

  it("should return undefined if getWorkspace.get returns falsy", async () => {
    const { getWorkspace, sut, id, changes } = makeSut();
    getWorkspace.$get = undefined;
    await expect(sut.edit(id, changes)).resolves.toBeUndefined();
  });

  it("should return undefined if getWorkspace.get returns removed workspace", async () => {
    const { getWorkspace, sut, id, changes } = makeSut();
    getWorkspace.$get._removed = new Date();
    await expect(sut.edit(id, changes)).resolves.toBeUndefined();
  });

  it("should throw if editWorkspace.edit throws", async () => {
    const { editWorkspace, sut, id, changes } = makeSut();
    jest.spyOn(editWorkspace, "edit").mockRejectedValue(new Error());
    await expect(sut.edit(id, changes)).rejects.toThrow();
  });

  it("should return edited workspace", async () => {
    const { getWorkspace, sut, id, changes } = makeSut();
    const result = await sut.edit(id, changes);
    expect(result._id).toBe(getWorkspace.$get._id);
    expect(result._timestamp).not.toBe(getWorkspace.$get._timestamp);
    expect(result._created).toBe(getWorkspace.$get._created);
    expect(result._removed).toBe(getWorkspace.$get._removed);
    expect(result.name).not.toBe(getWorkspace.$get.name);
    expect(result.ownerCnpj).not.toBe(getWorkspace.$get.ownerCnpj);
  });
});
