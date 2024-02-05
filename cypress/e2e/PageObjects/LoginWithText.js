/// <reference types="Cypress"/>

import write from "../../support/write-xlsx";


// / <reference types="Cypress-xpath"/>

const nameXpath = ":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input";
const pwdXpath = ":nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input";

class LoginWithText {
    login(url) {
        let uname, pwd;
        let row={};
        cy.visit(url);

        cy.get('.orangehrm-login-error > div > p').first().invoke('text').then((text) => {
            const myArray = text.split(":");
            uname = myArray[1].trim();
            row.name = myArray[0].trim();
            row.age=myArray[1].trim();
            cy.log('row in funct'+row);
            expect(uname).equal('Admin');
        });

        cy.get('.orangehrm-login-error > div > p').next().invoke('text').then((text) => {
            const myArray = text.split(":");
            pwd = myArray[1].trim();
            cy.log(pwd);
            expect(pwd).equal('admin123');
        });
        cy.wrap(null).then(() => {
        cy.log('row is ' + row);
        })
        // Now you can use uname and pwd here
        cy.get(nameXpath).type(`${uname}`);
        cy.get(pwdXpath).type(`${pwd}`);
        // Continue with the rest of your test logic

        cy.wrap(null).then(() => {
            cy.log('row is ' + row.name +'  '+row.age);
            const dataToWrite = [
                {Name:row.name, Age:row.age},
                { Name: 'John', Age: 25},
              // Add more rows as needed
          ];
          write({ file: 'output4.xlsx', sheet: 'Sheet1', data: dataToWrite });
        })
       
      
    }
}

export default LoginWithText;
