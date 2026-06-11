const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  video: true,
  env: {
    REACT_APP_USE_LOCAL_DATA: true,
    REACT_APP_API_REFRESH_RATE: 30000,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return require('./cypress/plugins/index.cjs')(on, config)
    },
    pageLoadTimeout: 120000, // 120 seconds
  },
});
