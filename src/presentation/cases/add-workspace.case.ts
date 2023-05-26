import { IAddWorkspaceCase } from "$/domain/cases";
import { UnauthorizedError } from "../errors";
import { IAddWorkspaceTask, IAuthorizeRequestTask } from "../tasks";

export class AddWorkspaceCase implements IAddWorkspaceCase {
  constructor (
    private readonly authorizeRequest: IAuthorizeRequestTask,
    private readonly addWorkspace: IAddWorkspaceTask
  ) { }

  async add (data: IAddWorkspaceCase.Data): Promise<IAddWorkspaceCase.Result> {
    const authorized = await this.authorizeRequest.authorize(data.headers.authorization);
    if (!authorized) {
      throw new UnauthorizedError();
    }
    const workspace = await this.addWorkspace.add(data.body);
    return workspace;
  }
}
