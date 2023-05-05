import config from "./jest.config";

config.collectCoverageFrom = ["!<rootDir>/src/main/**/*.ts"];
config.testMatch = ["**/*.spec.ts"];

/* eslint-disable-next-line import/no-default-export */
export default config;
