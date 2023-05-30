import { IAddWorkspaceCase, IEditWorkspaceCase } from "$/domain/cases";
import { OpenAPIV3 } from "openapi-types";
import { workspaceDTO } from "../dtos";
import { swaggerHelper } from "../swagger.helper";
import { workspaceTag } from "../tags";
import { IObjectSchema } from "../types";

export const editWorkspacePath: OpenAPIV3.PathsObject = {
  "/api/workspace/{_id}": {
    put: {
      externalDocs: {
        url: "https://github.com/leandroluk/apure-api-data/issues/11"
      },
      tags: [workspaceTag.name],
      operationId: "editWorkspace",
      summary: "Edit workspace",
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: "path", name: "_id", schema: { type: "string" }, required: true }
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [] as string[] & never[],
              properties: {
                name: workspaceDTO.properties.name,
                ownerCnpj: workspaceDTO.properties.ownerCnpj
              }
            } satisfies IObjectSchema<IEditWorkspaceCase.Data["body"]>
          }
        }
      },
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
              } satisfies IObjectSchema<IAddWorkspaceCase.Result>
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
