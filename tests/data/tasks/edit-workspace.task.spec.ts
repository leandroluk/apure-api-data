import { EditWorkspaceTask } from "$/data/tasks";
import { IEditWorkspaceTask } from "$/presentation/tasks";
import { MockEditWorkspaceRepo, MockGetWorkspaceRepo } from "mocks/data/repos";

const makeSut = (): {
  sut: EditWorkspaceTask;
  getWorkspace: MockGetWorkspaceRepo;
  editWorkspace: MockEditWorkspaceRepo;
  data: IEditWorkspaceTask.Data;
} => {
  const getWorkspace = new MockGetWorkspaceRepo();
  const editWorkspace = new MockEditWorkspaceRepo();
  const sut = new EditWorkspaceTask(
    getWorkspace,
    editWorkspace
  );
  const data: IEditWorkspaceTask.Data = {
    id: "id",
    changes: {
      name: "edited name",
      ownerCnpj: "edited ownerCnpj"
    }
  };
  return {
    getWorkspace,
    editWorkspace,
    sut,
    data
  };
};

describe("data/tasks/edit-workspace.task", () => {
  it("should throw if getWorkspace.get throws", async () => {
    const { getWorkspace, sut, data } = makeSut();
    jest.spyOn(getWorkspace, "get").mockRejectedValue(new Error());
    await expect(sut.edit(data)).rejects.toThrow();
  });

  it("should return undefined if getWorkspace.get returns falsy", async () => {
    const { getWorkspace, sut, data } = makeSut();
    getWorkspace.$get = undefined;
    await expect(sut.edit(data)).resolves.toBeUndefined();
  });

  it("should return undefined if getWorkspace.get returns removed workspace", async () => {
    const { getWorkspace, sut, data } = makeSut();
    getWorkspace.$get._removed = new Date();
    await expect(sut.edit(data)).resolves.toBeUndefined();
  });

  it("should throw if editWorkspace.edit throws", async () => {
    const { editWorkspace, sut, data } = makeSut();
    jest.spyOn(editWorkspace, "edit").mockRejectedValue(new Error());
    await expect(sut.edit(data)).rejects.toThrow();
  });

  it("should return edited workspace", async () => {
    const { getWorkspace, sut, data } = makeSut();
    const result = await sut.edit(data);
    expect(result._id).toBe(getWorkspace.$get._id);
    expect(result._timestamp).not.toBe(getWorkspace.$get._timestamp);
    expect(result._created).toBe(getWorkspace.$get._created);
    expect(result._removed).toBe(getWorkspace.$get._removed);
    expect(result.name).not.toBe(getWorkspace.$get.name);
    expect(result.ownerCnpj).not.toBe(getWorkspace.$get.ownerCnpj);
  });
});
