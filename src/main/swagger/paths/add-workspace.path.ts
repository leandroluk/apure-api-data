import { IAddWorkspaceCase } from "$/domain/cases";
import { OpenAPIV3 } from "openapi-types";
import { workspaceDTO } from "../dtos";
import { swaggerHelper } from "../swagger.helper";
import { workspaceTag } from "../tags";
import { IObjectSchema } from "../types";

export const addWorkspacePath: OpenAPIV3.PathsObject = {
  "/api/workspace": {
    put: {
      tags: [workspaceTag.name],
      operationId: "addWorkspace",
      summary: "Add workspace",
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
        201: {
          description: "created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: [],
                properties: {
                  _id: workspaceDTO.properties._id,
                  _timestamp: workspaceDTO.properties._timestamp,
                  _created: workspaceDTO.properties._created,
                  _removed: workspaceDTO.properties._removed,
                  name: workspaceDTO.properties.name,
                  ownerCnpj: workspaceDTO.properties.ownerCnpj
                }
              } satisfies IObjectSchema<IAddWorkspaceCase.Result>
            }
          }
        },
        400: swaggerHelper.commonResponses[400],
        401: swaggerHelper.commonResponses[401]
      }
    }
  }
};
