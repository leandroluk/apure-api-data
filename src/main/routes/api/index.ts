import { loggerMiddleware } from "$/main/middlewares";
import { Router } from "express";
import { workspaceRoutes } from "./workspace";

const apiRoutes = Router({ mergeParams: true });

apiRoutes.use(loggerMiddleware);

apiRoutes.use("/workspace", workspaceRoutes);

export { apiRoutes };
