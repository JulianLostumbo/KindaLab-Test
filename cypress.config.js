const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    
    chromeWebSecurity: false,
    modifyObstructiveCode: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
