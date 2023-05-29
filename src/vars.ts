import packageJson from "../package.json";

const { env: _, cwd } = process;

export const vars = {
  path: cwd(),
  env: _.NODE_ENV ?? "development",
  port: Number(_.PORT ?? 3000),
  app: {
    name: packageJson.name,
    description: packageJson.description,
    version: packageJson.version
  },
  defaults: {
    ttl: Number(_.DEFAULTS_TTL ?? 1000 * 60 * 60 * 24 * 365) // default 1 year
  },
  db: {
    mongo: new URL(_.DB_MONGO ?? "mongodb://mongo:mongo@localhost:40000/db?authSource=admin").href,
    limit: Number(_.DB_LIMIT ?? 50)
  },
  jwt: {
    secret: _.JWT_SECRET ?? "secret"
  }
};
