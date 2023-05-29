import * as factories from "$/main/factories";
import * as validators from "$/main/validation";
import { Router } from "express";

const workspaceRoutes = Router();

workspaceRoutes.put("/:_id", async (req, res) => {
  const data = await validators.editWorkspaceValidator(req);
  const result = await factories.editWorkspaceFactory().edit(data);
  res.json(result);
});

workspaceRoutes.post("/", async (req, res) => {
  const data = await validators.addWorkspaceValidator(req);
  const result = await factories.addWorkspaceFactory().add(data);
  res.status(201).json(result);
});

export { workspaceRoutes };
