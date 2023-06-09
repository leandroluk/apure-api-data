import { IEnableWorkspaceCase } from "$/domain/cases";
import { NotFoundError, UnauthorizedError } from "../errors";
import { IAuthorizeRequestTask, IEnableWorkspaceTask } from "../tasks";

export class EnableWorkspaceCase implements IEnableWorkspaceCase {
  constructor (
    private readonly authorizeRequest: IAuthorizeRequestTask,
    private readonly enableWorkspace: IEnableWorkspaceTask
  ) { }

  async enable (data: IEnableWorkspaceCase.Data): Promise<void> {
    const jwtAccount = await this.authorizeRequest.authorize(data.headers.authorization);
    if (!jwtAccount) {
      throw new UnauthorizedError();
    }
    const workspace = await this.enableWorkspace.enable({
      id: data.params.workspace_id,
      sessionId: data.headers.sid
    });
    if (!workspace) {
      throw new NotFoundError(`Workspace "${data.params.workspace_id}" not found`);
    }
  }
}
