import { mongoHelper } from "$/infra/mongo";
import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import { swagger } from "../swagger";

const routes = Router();

routes.get("/docs/swagger.json", (_req, res) => res.json(swagger));

routes.use("/docs", swaggerUI.serve, swaggerUI.setup(swagger));

routes.use("/health", async (_req, res) => {
  await mongoHelper.client.db().stats();
  res.sendStatus(200);
});

export { routes };
