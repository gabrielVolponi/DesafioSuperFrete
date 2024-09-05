const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout: 100000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1366,
    viewportHeight: 768,
    
    
  },
  retries: {
    runMode: 1,
    openMode: 1
  },
  
})