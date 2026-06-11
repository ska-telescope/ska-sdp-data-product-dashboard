const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  video: true,
  env: {
    REACT_APP_USE_LOCAL_DATA: true,
    REACT_APP_API_REFRESH_RATE: 30000,
  },
  e2e: {
    specPattern: 'tests/e2e/cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'tests/e2e/cypress/support/e2e.js',
    fixturesFolder: 'tests/e2e/cypress/fixtures',
    screenshotsFolder: 'tests/e2e/cypress/screenshots',
    videosFolder: 'tests/e2e/cypress/videos',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return require('./tests/e2e/cypress/plugins/index.cjs')(on, config)
    },
    pageLoadTimeout: 120000, // 120 seconds
  },
});
