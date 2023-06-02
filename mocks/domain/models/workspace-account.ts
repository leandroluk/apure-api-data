import { IWorkspaceAccount } from "$/domain/models";
import { mockEntity } from "../generics";
import { mockAccount } from "./account";
import { mockWorkspace } from "./workspace";

export const mockWorkspaceAccount: IWorkspaceAccount = {
  ...mockEntity,
  account_id: mockAccount._id,
  workspace_id: mockWorkspace._id,
  roles: [IWorkspaceAccount.Role.Admin]
};
