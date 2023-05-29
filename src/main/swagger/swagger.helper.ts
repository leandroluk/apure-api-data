import { NotFoundError, UnauthorizedError } from "$/presentation/errors";
import { IError, IObjectSchema } from "./types";

export const swaggerHelper = {
  commonResponses: {
    400: {
      description: "bad request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name", "message"],
            properties: {
              name: { type: "string" },
              message: { type: "string" }
            },
            example: {
              name: "ValidationError",
              message: "\"field\" is required"
            } satisfies IError
          } satisfies IObjectSchema<IError>
        }
      }
    },
    401: {
      description: "unauthorized",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name", "message"],
            properties: {
              name: { type: "string" },
              message: { type: "string" }
            },
            example: {
              name: UnauthorizedError.name,
              message: UnauthorizedError.defaultMessage
            } satisfies IError
          } satisfies IObjectSchema<IError>
        }
      }
    },
    404: {
      description: "not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name", "message"],
            properties: {
              name: { type: "string" },
              message: { type: "string" }
            },
            example: {
              name: UnauthorizedError.name,
              message: NotFoundError.defaultMessage
            } satisfies IError
          } satisfies IObjectSchema<IError>
        }
      }
    }
  }
};
