import { GetWorkspaceTask } from "$/data/tasks";
import { IGetAccountTask, IGetWorkspaceTask } from "$/presentation/tasks";
import { MockGetWorkspaceRepo } from "mocks/data/repos";

const makeSut = (): {
  getWorkspace: MockGetWorkspaceRepo;
  sut: GetWorkspaceTask;
  id: IGetWorkspaceTask.Id;
} => {
  const getWorkspace = new MockGetWorkspaceRepo();
  const sut = new GetWorkspaceTask(
    getWorkspace
  );
  const id: IGetAccountTask.Id = "id";
  return {
    getWorkspace,
    sut,
    id
  };
};

describe("data/tasks/get-workspace.task", () => {
  it("should throw if getWorkspace.get throws", async () => {
    const { getWorkspace, sut, id } = makeSut();
    jest.spyOn(getWorkspace, "get").mockRejectedValue(new Error());
    await expect(sut.get(id)).rejects.toThrow();
  });

  it("should return workspace", async () => {
    const { getWorkspace, sut, id } = makeSut();
    await expect(sut.get(id)).resolves.toMatchObject(getWorkspace.$get);
  });
});
