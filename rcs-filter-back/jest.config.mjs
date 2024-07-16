/**
 * Para uma explicação detalhada de cada propriedade de configuração, visite:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  }
};
