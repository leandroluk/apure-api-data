import { IAddWorkspaceCase } from "$/domain/cases";
import { IWorkspaceAccount } from "$/domain/models";
import { UnauthorizedError } from "../errors";
import { IAddWorkspaceAccountTask, IAddWorkspaceTask, IAuthorizeRequestTask } from "../tasks";

export class AddWorkspaceCase implements IAddWorkspaceCase {
  constructor (
    private readonly authorizeRequest: IAuthorizeRequestTask,
    private readonly addWorkspace: IAddWorkspaceTask,
    private readonly addWorkspaceAccount: IAddWorkspaceAccountTask
  ) { }

  async add (data: IAddWorkspaceCase.Data): Promise<void> {
    const jwtAccount = await this.authorizeRequest.authorize(data.headers.authorization);
    if (!jwtAccount) {
      throw new UnauthorizedError();
    }
    const workspace = await this.addWorkspace.add({
      value: data.body,
      sessionId: data.headers.sid
    });
    await this.addWorkspaceAccount.add({
      value: {
        account_id: jwtAccount._id,
        workspace_id: workspace._id,
        roles: [IWorkspaceAccount.Role.Admin]
      },
      sessionId: data.headers.sid
    });
  }
}
