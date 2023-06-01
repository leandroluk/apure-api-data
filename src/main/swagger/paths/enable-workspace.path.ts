import { IEnableWorkspaceCase } from "$/domain/cases";
import { OpenAPIV3 } from "openapi-types";
import { workspaceDTO } from "../dtos";
import { swaggerHelper } from "../swagger.helper";
import { workspaceTag } from "../tags";
import { IObjectSchema } from "../types";

export const enableWorkspacePath: OpenAPIV3.PathsObject = {
  "/api/workspace/{workspace_id}/restore": {
    put: {
      externalDocs: {
        url: "https://github.com/leandroluk/apure-api-data/issues/26"
      },
      tags: [workspaceTag.name],
      operationId: "enableWorkspace",
      summary: "Enable workspace",
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: "path", name: "workspace_id", schema: { type: "string" }, required: true }
      ],
      responses: {
        200: {
          description: "ok",
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
              } satisfies IObjectSchema<IEnableWorkspaceCase.Result>
            }
          }
        },
        400: swaggerHelper.commonResponses[400],
        401: swaggerHelper.commonResponses[401],
        404: swaggerHelper.commonResponses[404]
      }
    }
  }
};
