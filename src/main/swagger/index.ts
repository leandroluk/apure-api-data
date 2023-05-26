import { vars } from "$/vars";
import deepmerge from "deepmerge";
import { OpenAPIV3 } from "openapi-types";
import * as components from "./components";
// import * as paths from "./paths";
// import * as tags from "./tags";

const swagger: OpenAPIV3.Document = {
  openapi: "3.0.3",
  info: {
    title: vars.app.name,
    version: vars.app.version
  },
  tags: [], // Object.values(tags),
  paths: deepmerge.all<OpenAPIV3.PathsObject>([]), // Object.values(paths)),
  components: deepmerge.all<OpenAPIV3.ComponentsObject>(Object.values(components))
};

export { swagger };
