const { defineConfig } = require("cypress");
const { configurePlugin } = require('cypress-mongodb');

module.exports = defineConfig({
  viewportHeight: 1000,
  viewportWidth: 1905,
  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
    },
    baseUrl: 'http://localhost:8080',
    env: {
      apiBaseUrl: 'http://localhost:5001/api/livros',
      mongodb: {
        uri: 'mongodb+srv://dba:gui123@livroapi.5sbbg.mongodb.net/?retryWrites=true&w=majority&appName=LivroApi',
        database: 'test',
        collection: 'livros'
      }
    },
    video: true,
    videoCompression: true
  }
});
