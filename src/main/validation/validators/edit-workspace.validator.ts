import { IEditWorkspaceCase } from "$/domain/cases";
import { Joi } from "../lib";
import { validationHelper } from "../validation.helper";

export const editWorkspaceValidator = validationHelper.makeValidator(
  Joi.object<IEditWorkspaceCase.Data>({
    headers: Joi.object<IEditWorkspaceCase.Data["headers"]>({
      authorization: Joi.string().required().pattern(/^Bearer\s.+$/)
    }),
    params: Joi.object<IEditWorkspaceCase.Data["params"]>({
      workspace_id: Joi.string().required()
    }),
    body: Joi.object<IEditWorkspaceCase.Data["body"]>({
      name: Joi.string().max(100),
      ownerCnpj: Joi.string().cnpj()
    })
  })
);
