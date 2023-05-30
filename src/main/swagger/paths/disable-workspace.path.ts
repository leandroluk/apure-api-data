import { OpenAPIV3 } from "openapi-types";
import { swaggerHelper } from "../swagger.helper";
import { workspaceTag } from "../tags";

export const disableWorkspacePath: OpenAPIV3.PathsObject = {
  "/api/workspace/{_id}": {
    delete: {
      externalDocs: {
        url: "https://github.com/leandroluk/apure-api-data/issues/7"
      },
      tags: [workspaceTag.name],
      operationId: "disableWorkspace",
      summary: "Disable workspace",
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: "path", name: "_id", schema: { type: "string" }, required: true }
      ],
      responses: {
        204: { description: "no content" },
        400: swaggerHelper.commonResponses[400],
        401: swaggerHelper.commonResponses[401],
        404: swaggerHelper.commonResponses[404]
      }
    }
  }
};
