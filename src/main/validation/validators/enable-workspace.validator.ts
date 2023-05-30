import { IEnableWorkspaceCase } from "$/domain/cases";
import { Joi } from "../lib";
import { validationHelper } from "../validation.helper";

export const enableWorkspaceValidator = validationHelper.makeValidator(
  Joi.object<IEnableWorkspaceCase.Data>({
    headers: Joi.object<IEnableWorkspaceCase.Data["headers"]>({
      authorization: Joi.string().required().pattern(/^Bearer\s.+$/)
    }),
    params: Joi.object<IEnableWorkspaceCase.Data["params"]>({
      _id: Joi.string().required()
    })
  })
);
