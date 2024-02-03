import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const url = 'https://tb.tapi.videoready.tv/binge-mobile-config/pub/v1/api/config/binge/mobile'

When('I visit orangeHRm.com', () => {
  cy.visit('/')
})
Then("Mobile Api should hit",()=>{
 cy.intercept(url).as('mobile_config')
 cy.reload();
cy.wait('@mobile_config').then(inter=>{
    cy.log(JSON.stringify(inter))
})
})
