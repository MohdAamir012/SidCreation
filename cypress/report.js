/// <reference types="cypress" />
const fs = require('fs-extra');
const path = require('path');

const cucumberJsonDir = 'cucumber_report';
const cucumberReportFileMap = {};
const cucumberReportMap = {};
const jsonIndentLevel = 2;
const screenshotsDir = './artifacts/screenshots';
var reporter = require('cucumber-html-reporter');

getCucumberReportMaps();
addScreenshots();
generateReport();

function getCucumberReportMaps() {
  const files = fs.readdirSync(cucumberJsonDir).filter(file => {
    return file.indexOf('.json') > -1;
  });
  files.forEach(file => {
    const json = JSON.parse(fs.readFileSync(path.join(cucumberJsonDir, file)));
    if (!json[0]) {
      return;
    }
    const [feature] = json[0].uri.split('/').reverse();
    cucumberReportFileMap[feature] = file;
    cucumberReportMap[feature] = json;
  });
}

function addScreenshots() {
  if(!fs.existsSync(screenshotsDir)){
    const creaDir = (dirpath) => {
    fs.mkdir(screenshotsDir,{recursive:false},(error) => {
      if(error){
        console.log('error occured',error);
      }
    });
  }  
}
  else
  {
    const failingFeatures = fs.readdirSync(screenshotsDir);
  failingFeatures.forEach(feature => {
    const screenshots = fs.readdirSync(path.join(screenshotsDir, feature)).filter(file => {
      return file.indexOf('.png') > -1;
    });
    screenshots.forEach(screenshot => {
      const regex = /--\ .+?((?=\ \(example\ #\d+\))|(?=\ \(failed\))|(?=\.\w{3}))/g;
      const [scenarioName] = screenshot.match(regex);
      const myScenarios = cucumberReportMap[feature][0].elements.filter(e => scenarioName.includes(e.name));
      if (!myScenarios) {
        return;
      }
      myScenarios.forEach(myScenario => {
        let myStep;
        if (screenshot.includes('failed')) {
          myStep = myScenario.steps.find(step => step.result.status === 'failed');
        } else {
          myStep = myScenario.steps.find(step => step.name.includes('screenshot'));
        }
        if (!myStep) {
          return;
        }
        const data = fs.readFileSync(path.join(screenshotsDir, feature, screenshot));
        if (data) {
          const base64Image = Buffer.from(data, 'binary').toString('base64');
          if (!myStep.embeddings) {
            myStep.embeddings = [];
          } else {
            myStep.embeddings.pop();
          }
          myStep.embeddings.push({ data: base64Image, mime_type: 'image/png' });
        }
      });
      fs.writeFileSync(
        path.join(cucumberJsonDir, cucumberReportFileMap[feature]),
        JSON.stringify(cucumberReportMap[feature], null, jsonIndentLevel),
      );
    });
  });
  }
  
  
}

function generateReport() {
  var options = {
    theme: 'bootstrap',
    jsonDir: 'cucumber_report',
    output: `cypress/report/cucumber_report.html`,
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: false,
    storeScreenshots: false,
    noInlineScreenshots: false,

    metadata: {
      'App Version': 'Pre-Prod',
      'Test Environment': process.env,
      Browser: 'Chrome',
      Platform: 'Windows',
      Parallel: 'Scenarios',
      Executed: 'Remote',
    },
  };
  reporter.generate(options);
}
