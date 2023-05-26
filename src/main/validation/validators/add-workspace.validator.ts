import { IAddWorkspaceCase } from "$/domain/cases";
import Joi from "joi";
import { validationHelper } from "../validation.helper";

export const addWorkspaceValidator = validationHelper.makeValidator(
  Joi.object<IAddWorkspaceCase.Data>({
    headers: Joi.object<IAddWorkspaceCase.Data["headers"]>({
      authorization: Joi.string().required().pattern(/^Bearer\s.+$/)
    }),
    body: Joi.object<IAddWorkspaceCase.Data["body"]>({
      name: Joi.string().required().min(1).max(100),
      ownerCnpj: Joi.string().required().length(14)
    })
  })
);
