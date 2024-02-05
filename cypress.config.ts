import { defineConfig } from "cypress";
const cucumber = require('cypress-cucumber-preprocessor').default
const browserify = require("@cypress/browserify-preprocessor");
const fs = require("fs");
const path = require("path");
const readXlsx = require('./cypress/support/read-xlsx');
const writeXlsx = require('./cypress/support/write-xlsx')
export default  defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const version =config.env.version || "web";
      const testingEnv =config.env.server || "uat";
      config.env = require(`./cypress/config/${version}/${testingEnv}.json`)
      config.baseUrl =config.env.baseUrl;
      config.screenshotsFolder=config.env.screenshotsFolder;
      config.defaultCommandTimeout=config.env.defaultCommandTimeout;
      config.videosFolder=config.env.videosFolder;
      config.reporter=config.env.reporter;
      config.reporterOptions=config.env.reporterOptions;
      config.specPattern=config.env.specPattern;
      config.env.ENVIRONMENT = testingEnv;
      const options = {
        ...browserify.defaultOptions,
        typescript: require.resolve("typescript"),
      };
      on('file:preprocessor', cucumber(options))
      on('task',{'readXlsx':readXlsx.read})
      on('task',{'writeXlsx':writeXlsx.write})
      
      return config;
    },
  },
})
