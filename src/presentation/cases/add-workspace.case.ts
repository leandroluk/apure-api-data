import { IAddWorkspaceCase } from "$/domain/cases";
import { UnauthorizedError } from "../errors";
import { IAddWorkspaceTask, IAuthorizeTask } from "../tasks";

export class AddWorkspaceCase implements IAddWorkspaceCase {
  constructor (
    private readonly authorize: IAuthorizeTask,
    private readonly addWorkspace: IAddWorkspaceTask
  ) { }

  async add (data: IAddWorkspaceCase.Data): Promise<IAddWorkspaceCase.Result> {
    const isAuthorized = await this.authorize.authorize(data.headers.authorization);
    if (!isAuthorized) {
      throw new UnauthorizedError();
    }
    const workspace = await this.addWorkspace.add(data.body);
    return workspace;
  }
}
