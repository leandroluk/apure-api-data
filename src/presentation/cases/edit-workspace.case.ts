import { IEditWorkspaceCase } from "$/domain/cases";
import { NotFoundError, UnauthorizedError } from "../errors";
import { IAuthorizeRequestTask, IEditWorkspaceTask } from "../tasks";

export class EditWorkspaceCase implements IEditWorkspaceCase {
  constructor (
    private readonly authorizeRequest: IAuthorizeRequestTask,
    private readonly editWorkspace: IEditWorkspaceTask
  ) { }

  async edit (
    data: IEditWorkspaceCase.Data
  ): Promise<IEditWorkspaceCase.Result> {
    const authorized = await this.authorizeRequest.authorize(data.headers.authorization);
    if (!authorized) {
      throw new UnauthorizedError();
    }
    const workspace = await this.editWorkspace.edit({
      id: data.params.workspace_id,
      changes: data.body,
      sessionId: data.headers.sid
    });
    if (!workspace) {
      throw new NotFoundError(`Workspace "${data.params.workspace_id}" not found`);
    }
    return workspace;
  }
}
