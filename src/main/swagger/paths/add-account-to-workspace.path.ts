import { IAddAccountToWorkspaceCase } from "$/domain/cases";
import { OpenAPIV3 } from "openapi-types";
import { workspaceAccountDTO } from "../dtos";
import { swaggerHelper } from "../swagger.helper";
import { workspaceAccountTag } from "../tags";
import { IObjectSchema } from "../types";

export const addAccountToWorkspacePath: OpenAPIV3.PathsObject = {
  "/api/workspace/{workspace_id}/account": {
    post: {
      externalDocs: {
        url: "https://github.com/leandroluk/apure-api-data/issues/3"
      },
      tags: [workspaceAccountTag.name],
      operationId: "addAccountToWorkspace",
      summary: "Add account to workspace",
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: "path", name: "workspace_id", schema: { type: "string" }, required: true }
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["account_id", "roles"],
              properties: {
                account_id: workspaceAccountDTO.properties.account_id,
                roles: workspaceAccountDTO.properties.roles
              }
            } satisfies IObjectSchema<IAddAccountToWorkspaceCase.Data["body"]>
          }
        }
      },
      responses: {
        201: { description: "created" },
        400: swaggerHelper.commonResponses[400],
        401: swaggerHelper.commonResponses[401],
        404: swaggerHelper.commonResponses[404]
      }
    }
  }
};
