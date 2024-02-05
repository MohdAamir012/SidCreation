import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import LoginWithText from "../../PageObjects/LoginWithText";

let loginWithText =new LoginWithText();

Given('I launch the app', () => {
    // for (let index = 0; index < 1; index++) {
        loginWithText.login('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
    // }
    
})