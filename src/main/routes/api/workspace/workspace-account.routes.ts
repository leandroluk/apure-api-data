import * as factories from "$/main/factories";
import * as validation from "$/main/validation";
import { mongoWrapper } from "$/main/wrappers";
import { Router } from "express";

const workspaceAccountRoutes = Router({ mergeParams: true });

workspaceAccountRoutes.post("/", mongoWrapper(async (req, res) => {
  const data = await validation.addAccountToWorkspaceValidator(req);
  await factories.addAccountToWorkspaceFactory().add(data);
  res.sendStatus(201);
}));

export { workspaceAccountRoutes };
