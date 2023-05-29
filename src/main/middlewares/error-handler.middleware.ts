import { logger } from "$/logger";
import { vars } from "$/vars";
import { ErrorRequestHandler } from "express";

const errors: Record<string, number> = {
  ValidationError: 400,
  UnauthorizedError: 401,
  ForbiddenError: 403,
  NotFoundError: 404,
  ConflitError: 409
};

export const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message, stack: _, ...rest } = err;
  const status = errors[name];
  if (status) {
    const response = vars.env === "production"
      ? { name, message }
      : { name, message, ...rest };
    return res.status(status).json(response);
  }
  res.sendStatus(500);
  logger.error(err);
};
