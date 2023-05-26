import config from "./jest.config";

config.collectCoverageFrom = [
  "<rootDir>/src/data/**/*.ts",
  "<rootDir>/src/domain/**/*.ts",
  "<rootDir>/src/infra/**/*.ts",
  "<rootDir>/src/presentation/**/*.ts",
  "!<rootDir>/src/**/index.ts",
  "!<rootDir>/src/main/**/*.ts"
];
config.testMatch = ["**/*.spec.ts"];

/* eslint-disable-next-line import/no-default-export */
export default config;
