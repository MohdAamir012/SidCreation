import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { SidCreation } from '../../PageObjects/SidCreation';

let sidCreation =new SidCreation();

Given('I open uat tataplay portal', () => {
    for (let index = 0; index < 10; index++) {
        sidCreation.before();
        sidCreation.fillDetails(index);
        sidCreation.gotoSDPage();
        sidCreation.selectLang();
        sidCreation.selectType();
        sidCreation.selectPack();
        sidCreation.paymentDetail();
        sidCreation.setupDeliveryAdd();
        sidCreation.selectPaymentMode();
        sidCreation.enterOtp();
        sidCreation.removePopup();
        sidCreation.getSid();    
    }
    
})