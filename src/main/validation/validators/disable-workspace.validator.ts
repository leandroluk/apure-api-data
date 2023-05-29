import { IDisableWorkspaceCase } from "$/domain/cases";
import { Joi } from "../lib";
import { validationHelper } from "../validation.helper";

export const disableWorkspaceValidator = validationHelper.makeValidator(
  Joi.object<IDisableWorkspaceCase.Data>({
    headers: Joi.object<IDisableWorkspaceCase.Data["headers"]>({
      authorization: Joi.string().required().pattern(/^Bearer\s.+$/)
    }),
    params: Joi.object<IDisableWorkspaceCase.Data["params"]>({
      _id: Joi.string().required()
    })
  })
);
