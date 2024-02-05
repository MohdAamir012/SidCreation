import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { SidCreation } from '../../PageObjects/SidCreation';

let sidCreation =new SidCreation();

Given('I open uat tataplay portal', () => {
    const dataToWrite = [];
    for (let index = 0; index < 1; index++) {
        let obj= {};
        sidCreation.before();
        obj=sidCreation.fillDetails(index,obj);
        sidCreation.gotoSDPage();
        sidCreation.selectLang();
        sidCreation.selectType();
        sidCreation.selectPack();
        sidCreation.paymentDetail();
        sidCreation.setupDeliveryAdd();
        sidCreation.selectPaymentMode();
        sidCreation.enterOtp();
        // sidCreation.removePopup();
        obj=sidCreation.getSid(obj);
        dataToWrite.push(obj); 
    }
    sidCreation.writeToXlsx(dataToWrite);
})