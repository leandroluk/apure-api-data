import { IAddAccountToWorkspaceCase } from "$/domain/cases";
import { IWorkspaceAccount } from "$/domain/models";
import { Joi } from "../lib";
import { validationHelper } from "../validation.helper";

export const addAccountToWorkspaceValidator = validationHelper.makeValidator(
  Joi.object<IAddAccountToWorkspaceCase.Data>({
    headers: Joi.object<IAddAccountToWorkspaceCase.Data["headers"]>({
      authorization: Joi.string().required().pattern(/^Bearer\s.+$/)
    }),
    params: Joi.object<IAddAccountToWorkspaceCase.Data["params"]>({
      workspace_id: Joi.string().required()
    }),
    body: Joi.object<IAddAccountToWorkspaceCase.Data["body"]>({
      account_id: Joi.string().required(),
      roles: Joi.array().required().min(1).unique().items(
        Joi.string().valid(
          IWorkspaceAccount.Role.Admin,
          IWorkspaceAccount.Role.Manager,
          IWorkspaceAccount.Role.Viewer
        )
      )
    })
  })
);
