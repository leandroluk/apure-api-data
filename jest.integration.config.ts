import config from "./jest.config";

config.collectCoverageFrom = [
  "<rootDir>/src/main/**/*.ts",
  "!<rootDir>/src/**/index.ts",
  "!<rootDir>/src/data/**/*.ts",
  "!<rootDir>/src/domain/**/*.ts",
  "!<rootDir>/src/infra/**/*.ts",
  "!<rootDir>/src/presentation/**/*.ts"
];
config.testMatch = ["**/*.test.ts"];

/* eslint-disable-next-line import/no-default-export */
export default config;
