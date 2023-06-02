import { IAddAccountToWorkspaceCase } from "$/domain/cases";
import { IWorkspaceAccount } from "$/domain/models";
import { ConflitError, NotFoundError, UnauthorizedError } from "../errors";
import {
  IAddWorkspaceAccountTask,
  IAuthorizeRequestTask,
  IGetAccountTask,
  IGetWorkspaceAccountByAccountTask,
  IGetWorkspaceTask
} from "../tasks";

export class AddAccountToWorkspaceCase implements IAddAccountToWorkspaceCase {
  constructor (
    private readonly authorizeRequest: IAuthorizeRequestTask,
    private readonly getAccount: IGetAccountTask,
    private readonly getWorkspace: IGetWorkspaceTask,
    private readonly getWorkspaceAccountByAccount: IGetWorkspaceAccountByAccountTask,
    private readonly addWorkspaceAccount: IAddWorkspaceAccountTask
  ) { }

  async add (
    data: IAddAccountToWorkspaceCase.Data
  ): Promise<void> {
    const jwtAccount = await this.authorizeRequest.authorize(data.headers.authorization);
    if (!jwtAccount) {
      throw new UnauthorizedError();
    }
    const [workspaceAccount, accountToAdd, workspace] = await Promise.all([
      this.getWorkspaceAccountByAccount.get({
        account_id: jwtAccount._id,
        workspace_id: data.params.workspace_id
      }),
      this.getAccount.get(data.body.account_id),
      this.getWorkspace.get(data.params.workspace_id)
    ]);
    if (!workspaceAccount.roles.includes(IWorkspaceAccount.Role.Admin)) {
      throw new ConflitError("You no have permissions to perform this action");
    } else if (!accountToAdd || accountToAdd._removed) {
      throw new NotFoundError(`Account "${data.body.account_id}" not found`);
    } else if (!workspace || workspace._removed) {
      throw new NotFoundError(`Workspace "${data.params.workspace_id}" not found`);
    }
    await this.addWorkspaceAccount.add({
      value: {
        account_id: data.body.account_id,
        roles: data.body.roles,
        workspace_id: data.params.workspace_id
      }
    });
  }
}
