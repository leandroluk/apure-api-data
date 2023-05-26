import { MESSAGE_ACCOUNT_CONFIRM } from "$/presentation/constants";
import { ConflitError, ForbiddenError, NotFoundError, UnauthorizedError } from "$/presentation/errors";
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
    403: {
      description: "forbidden",
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
              name: ForbiddenError.name,
              message: MESSAGE_ACCOUNT_CONFIRM
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
              name: NotFoundError.name,
              message: "Cannot find resource"
            } satisfies IError
          } satisfies IObjectSchema<IError>
        }
      }
    },
    409: {
      description: "conflit",
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
              name: ConflitError.name,
              message: "The required resource already exists"
            } satisfies IError
          } satisfies IObjectSchema<IError>
        }
      }
    }
  }
};
