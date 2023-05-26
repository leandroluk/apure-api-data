import * as factories from "$/main/factories";
import * as validators from "$/main/validation";
import { Router } from "express";

const workspaceRoutes = Router();

workspaceRoutes.post("/", async (req, res) => {
  const data = await validators.addWorkspaceValidator(req);
  const result = await factories.addWorkspaceFactory().add(data);
  res.status(201).json(result);
});

export { workspaceRoutes };
