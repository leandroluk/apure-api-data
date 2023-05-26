import { mongoHelper } from "./infra/mongo";
import { logger } from "./logger";
import { app } from "./main";
import { vars } from "./vars";

mongoHelper
  .connect()
  .then(() => app.listen(vars.port, () => logger.info(`start on port ${vars.port}`)))
  .catch((error: Error) => { logger.error(error); process.exit(1); });
