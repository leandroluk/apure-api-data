import { IAddWorkspaceCase } from "$/domain/cases";
import { Joi } from "../lib";
import { validationHelper } from "../validation.helper";

export const addWorkspaceValidator = validationHelper.makeValidator(
  Joi.object<IAddWorkspaceCase.Data>({
    headers: Joi.object<IAddWorkspaceCase.Data["headers"]>({
      authorization: Joi.string().required().pattern(/^Bearer\s.+$/)
    }),
    body: Joi.object<IAddWorkspaceCase.Data["body"]>({
      name: Joi.string().required().max(100),
      ownerCnpj: Joi.string().required().cnpj()
    })
  })
);
