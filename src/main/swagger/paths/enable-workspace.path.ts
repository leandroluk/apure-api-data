import { OpenAPIV3 } from "openapi-types";
import { swaggerHelper } from "../swagger.helper";
import { workspaceTag } from "../tags";

export const enableWorkspacePath: OpenAPIV3.PathsObject = {
  "/api/workspace/{workspace_id}/_restore": {
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
        200: { description: "ok" },
        400: swaggerHelper.commonResponses[400],
        401: swaggerHelper.commonResponses[401],
        404: swaggerHelper.commonResponses[404]
      }
    }
  }
};
