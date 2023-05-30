import { IEnableWorkspaceCase } from "$/domain/cases";
import { NotFoundError, UnauthorizedError } from "../errors";
import { IAuthorizeRequestTask, IEnableWorkspaceTask } from "../tasks";

export class EnableWorkspaceCase implements IEnableWorkspaceCase {
  constructor (
    private readonly authorizeRequest: IAuthorizeRequestTask,
    private readonly enableWorkspace: IEnableWorkspaceTask
  ) { }

  async enable (
    data: IEnableWorkspaceCase.Data
  ): Promise<IEnableWorkspaceCase.Result> {
    const authorized = await this.authorizeRequest.authorize(data.headers.authorization);
    if (!authorized) {
      throw new UnauthorizedError();
    }
    const workspace = await this.enableWorkspace.enable(data.params._id);
    if (!workspace) {
      throw new NotFoundError(`Workspace "${data.params._id}" not found`);
    }
    return workspace;
  }
}
