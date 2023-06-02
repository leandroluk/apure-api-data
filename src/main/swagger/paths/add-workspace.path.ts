import { IAddWorkspaceCase } from "$/domain/cases";
import { OpenAPIV3 } from "openapi-types";
import { workspaceDTO } from "../dtos";
import { swaggerHelper } from "../swagger.helper";
import { workspaceTag } from "../tags";
import { IObjectSchema } from "../types";

export const addWorkspacePath: OpenAPIV3.PathsObject = {
  "/api/workspace": {
    post: {
      externalDocs: {
        url: "https://github.com/leandroluk/apure-api-data/issues/4"
      },
      tags: [workspaceTag.name],
      operationId: "addWorkspace",
      summary: "Add workspace",
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "ownerCnpj"],
              properties: {
                name: workspaceDTO.properties.name,
                ownerCnpj: workspaceDTO.properties.ownerCnpj
              }
            } satisfies IObjectSchema<IAddWorkspaceCase.Data["body"]>
          }
        }
      },
      responses: {
        201: { description: "created" },
        400: swaggerHelper.commonResponses[400],
        401: swaggerHelper.commonResponses[401]
      }
    }
  }
};
