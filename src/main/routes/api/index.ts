import { loggerMiddleware } from "$/main/middlewares";
import { Router } from "express";
import { workspaceRoutes } from "./workspace.routes";

const apiRoutes = Router();

apiRoutes.use(loggerMiddleware);

apiRoutes.use("/workspace", workspaceRoutes);

export { apiRoutes };
