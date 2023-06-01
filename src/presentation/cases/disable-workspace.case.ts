import { IDisableWorkspaceCase } from "$/domain/cases";
import { NotFoundError, UnauthorizedError } from "../errors";
import { IAuthorizeRequestTask, IDisableWorkspaceTask } from "../tasks";

export class DisableWorkspaceCase implements IDisableWorkspaceCase {
  constructor (
    private readonly authorizeRequest: IAuthorizeRequestTask,
    private readonly disableWorkspace: IDisableWorkspaceTask
  ) { }

  async disable (
    data: IDisableWorkspaceCase.Data
  ): Promise<void> {
    const authorized = await this.authorizeRequest.authorize(data.headers.authorization);
    if (!authorized) {
      throw new UnauthorizedError();
    }
    const isDisabled = await this.disableWorkspace.disable({
      id: data.params.workspace_id,
      sessionId: data.headers.sid
    });
    if (!isDisabled) {
      throw new NotFoundError(`Workspace "${data.params.workspace_id}" not found`);
    }
  }
}
