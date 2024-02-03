import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { BingeGuest } from '../../PageObjects/BingeGuest';

let bingeGuest =new BingeGuest();

Given('I open Binge WebLarge', () => {
  bingeGuest.before();
  bingeGuest.verifyExcel();
})

When("I see language drawer on frist lanuch",()=>{
 bingeGuest.languageDrawer();
})

Then('I see marketing drawer after reload the app',()=>{
  bingeGuest.marketingDrawer();
  bingeGuest.login();
  bingeGuest.searchPartners();
})
