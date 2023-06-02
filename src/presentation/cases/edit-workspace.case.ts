import { IEditWorkspaceCase } from "$/domain/cases";
import { NotFoundError, UnauthorizedError } from "../errors";
import { IAuthorizeRequestTask, IEditWorkspaceTask } from "../tasks";

export class EditWorkspaceCase implements IEditWorkspaceCase {
  constructor (
    private readonly authorizeRequest: IAuthorizeRequestTask,
    private readonly editWorkspace: IEditWorkspaceTask
  ) { }

  async edit (data: IEditWorkspaceCase.Data): Promise<void> {
    const jwtAccount = await this.authorizeRequest.authorize(data.headers.authorization);
    if (!jwtAccount) {
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
  }
}
