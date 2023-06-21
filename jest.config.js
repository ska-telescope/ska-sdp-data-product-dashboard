module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
  },
  preset: 'jest-preset-react',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ["<rootDir>/cypress/", "<rootDir>/.cache/Cypress"],
  testResultsProcessor: 'jest-junit',
  reporters: [ "default", "jest-junit" ],
  coverageReporters: [
    "text",
    "cobertura",
    "html"
  ]
};
