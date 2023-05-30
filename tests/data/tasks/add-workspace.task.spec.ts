import { AddWorkspaceTask } from "$/data/tasks";
import { IAddWorkspaceTask } from "$/presentation/tasks";
import { MockCreateUuidAdapter } from "mocks/data/adapters";
import { MockAddWorkspaceRepo } from "mocks/data/repos";

const makeSut = (): {
  createUuid: MockCreateUuidAdapter;
  addWorkspace: MockAddWorkspaceRepo;
  sut: AddWorkspaceTask;
  data: IAddWorkspaceTask.Data;
} => {
  const createUuid = new MockCreateUuidAdapter();
  const addWorkspace = new MockAddWorkspaceRepo();
  const sut = new AddWorkspaceTask(
    createUuid,
    addWorkspace
  );
  const data: IAddWorkspaceTask.Data = {
    value: {
      name: "name",
      ownerCnpj: "ownerCnpj"
    }
  };
  return {
    createUuid,
    addWorkspace,
    sut,
    data
  };
};

describe("data/tasks/add-workspace.task", () => {
  it("should throw if createUuid.create throws", async () => {
    const { createUuid, sut, data } = makeSut();
    jest.spyOn(createUuid, "create").mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it("should throw if addWorkspace.add throws", async () => {
    const { addWorkspace, sut, data } = makeSut();
    jest.spyOn(addWorkspace, "add").mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it("should return added workspace", async () => {
    const { createUuid, sut, data } = makeSut();
    const result = await sut.add(data);
    expect(result._id).toBe(createUuid.$create);
    expect(result._timestamp).toBeDefined();
    expect(result._created).toBeDefined();
    expect(result._removed).toBeFalsy();
    expect(result.name).toBe(data.value.name);
    expect(result.ownerCnpj).toBe(data.value.ownerCnpj);
  });
});
