import { OpenAPIV3 } from "openapi-types";

export const bearerAuthSecurityScheme: OpenAPIV3.ComponentsObject = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT"
    }
  }
};
