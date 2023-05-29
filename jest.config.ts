import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/index.ts",
    "!<rootDir>/src/vars.ts"
  ],
  coverageDirectory: ".tmp/coverage",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  moduleNameMapper: {
    "mocks/(.*)": "<rootDir>/mocks/$1",
    "[$]/(.*)": "<rootDir>/src/$1",
    "tests/(.*)": "<rootDir>/tests/$1"
  },
  preset: "ts-jest",
  restoreMocks: true,
  roots: ["<rootDir>/src", "<rootDir>/mocks", "<rootDir>/tests"],
  setupFiles: ["<rootDir>/tests/setup.ts"],
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts", "**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/"]
};

/* eslint-disable-next-line import/no-default-export */
export default config;
