import * as factories from "$/main/factories";
import * as validators from "$/main/validation";
import { mongoWrapper } from "$/main/wrappers";
import { Router } from "express";

const workspaceRoutes = Router();

// enableWorkspace
workspaceRoutes.delete("/:_id/restore", mongoWrapper(async (req, res) => {
  const data = await validators.disableWorkspaceValidator(req);
  const result = await factories.enableWorkspaceFactory().enable(data);
  res.json(result);
}));

// editWorkspace
workspaceRoutes.put("/:_id", mongoWrapper(async (req, res) => {
  const data = await validators.editWorkspaceValidator(req);
  const result = await factories.editWorkspaceFactory().edit(data);
  res.json(result);
}));

// disableWorkspace
workspaceRoutes.delete("/:_id", mongoWrapper(async (req, res) => {
  const data = await validators.disableWorkspaceValidator(req);
  await factories.disableWorkspaceFactory().disable(data);
  res.sendStatus(204);
}));

// addWorkspace
workspaceRoutes.post("/", mongoWrapper(async (req, res) => {
  const data = await validators.addWorkspaceValidator(req);
  const result = await factories.addWorkspaceFactory().add(data);
  res.status(201).json(result);
}));

export { workspaceRoutes };
