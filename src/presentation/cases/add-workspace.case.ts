import { IAddWorkspaceCase } from "$/domain/cases";
import { UnauthorizedError } from "../errors";
import { IAddWorkspaceAccountTask, IAddWorkspaceTask, IAuthorizeRequestTask } from "../tasks";

export class AddWorkspaceCase implements IAddWorkspaceCase {
  constructor (
    private readonly authorizeRequest: IAuthorizeRequestTask,
    private readonly addWorkspace: IAddWorkspaceTask,
    private readonly addWorkspaceAccount: IAddWorkspaceAccountTask
  ) { }

  async add (
    data: IAddWorkspaceCase.Data
  ): Promise<IAddWorkspaceCase.Result> {
    const account = await this.authorizeRequest.authorize(data.headers.authorization);
    if (!account) {
      throw new UnauthorizedError();
    }
    const workspace = await this.addWorkspace.add(data.body);
    await this.addWorkspaceAccount.add({
      account_id: account._id,
      workspace_id: workspace._id,
      roles: ["admin"]
    });
    return workspace;
  }
}
