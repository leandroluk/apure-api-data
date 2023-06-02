import * as factories from "$/main/factories";
import * as validation from "$/main/validation";
import { mongoWrapper } from "$/main/wrappers";
import { Router } from "express";
import { workspaceAccountRoutes } from "./workspace-account.routes";

const workspaceRoutes = Router({ mergeParams: true });

workspaceRoutes.use("/:workspace_id/account", workspaceAccountRoutes);

// enableWorkspace
workspaceRoutes.delete("/:workspace_id/_restore", mongoWrapper(async (req, res) => {
  const data = await validation.disableWorkspaceValidator(req);
  await factories.enableWorkspaceFactory().enable(data);
  res.sendStatus(200);
}));

// editWorkspace
workspaceRoutes.put("/:workspace_id", mongoWrapper(async (req, res) => {
  const data = await validation.editWorkspaceValidator(req);
  await factories.editWorkspaceFactory().edit(data);
  res.sendStatus(200);
}));

// disableWorkspace
workspaceRoutes.delete("/:workspace_id", mongoWrapper(async (req, res) => {
  const data = await validation.disableWorkspaceValidator(req);
  await factories.disableWorkspaceFactory().disable(data);
  res.sendStatus(200);
}));

// addWorkspace
workspaceRoutes.post("/", mongoWrapper(async (req, res) => {
  const data = await validation.addWorkspaceValidator(req);
  await factories.addWorkspaceFactory().add(data);
  res.sendStatus(201);
}));

export { workspaceRoutes };
