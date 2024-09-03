const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1000,
  viewportWidth:1905,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8080',
    env: {
      apiBaseUrl: 'http://localhost:5001/api/livros'
    }
  },
  video:false
});
