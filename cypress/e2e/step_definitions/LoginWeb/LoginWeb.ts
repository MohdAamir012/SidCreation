import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const url = 'https://mohdaamir.netlify.app'

Given('I open Google page', () => {
  cy.visit(url)
})
When("I see Google in the title",()=>{
  cy.title();
})
