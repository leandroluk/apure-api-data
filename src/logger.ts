import { createLogger, format, transports } from "winston";
import { vars } from "./vars";

export const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { app: vars.app },
  transports: [
    new transports.Console(),
    new transports.File({ filename: ".tmp/log.json", level: "debug" })
  ]
});
