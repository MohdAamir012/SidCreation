import write from "../../support/write-xlsx";

export class SidCreation{
    
      before(){
          cy.visit('/')
          cy.get('[href="/tata-play-new-dth-connection-online/get-connection?exp=b&itm_source=NonLoggedIn&itm_medium=Internalbutton&itm_campaign=GetConnection_NonLoggedIn"]').should('be.visible').click();
      }
      fillDetails(i,obj){
        let mobileNo = `6387277373`;
        obj.mobileNo=mobileNo;
        cy.get('#firstName').type('Tushar');
        cy.get('#lastName').type('Patel');
        cy.get('#mobileNumber').type(mobileNo);

        cy.get('#emailId').type('mohd.aamir@tothenew.com');
        cy.get('#pinCode').type('110006');
        cy.get('button>span.MuiButton-label').click();
        return obj;
      }
      gotoSDPage(){
        cy.get('.slick-next').click();
        cy.get('.slick-next').click();
        cy.get('.slick-next').click();
        cy.get('[data-index="5"] > :nth-child(1) > [tabindex="-1"] > .card > .card-footer > .dflex-sb > .MuiButtonBase-root > .MuiButton-label')
        .click();

      }
      selectLang(){
        cy.get('.text-center > :nth-child(2) > .form-check-label').click();
        cy.get('.MuiButton-label').click();
      }
      selectType(){
        cy.get(':nth-child(1) > .form-check-label > .img').click();
        cy.get('.MuiButton-label').click();
      }
      selectPack(){
        cy.get('button>span.MuiButton-label').first().click();
      }
      paymentDetail(){
        cy.get('#gnc-make-payment-summary').click();
      }
      setupDeliveryAdd(){
        cy.get('.css-1ep9fjw').click();
        cy.get('#react-select-2-option-4').click();
        cy.get('#address').type('Binge Bazar');
        cy.get('#landmark').type('Binge QE');
        cy.get('.MuiButton-label').click();
        cy.get('.ticket-timewrapp > :nth-child(1)').click();
        cy.get('.MuiButton-label').click();

      }
      selectPaymentMode(){
        cy.get(':nth-child(2) > .card-body > .plan-select').click();
        cy.get('.text-center').click();
      }
      enterOtp(){
        cy.get('[tabindex="1"]').type(3);
        cy.get('[tabindex="2"]').type(1);
        cy.get('[tabindex="3"]').type(0);
        cy.get('[tabindex="4"]').type(5);
        cy.get('[tabindex="5"]').type(2);
        cy.get('[tabindex="6"]').type(2);
        cy.get('.MuiButton-label').click();
        cy.get('.body-container > .id-text').invoke('text').then((text) => {
          const myArray = text.split(":");
          cy.log(myArray[1]);
          let sidy = myArray[1].trim();
            cy.log(sidy);
            });
      }
      removePopup(){
        cy.get('.demo-icon').click();
      }
      getSid(obj){
        let sid ;
        cy.get('.body-container > .id-text').invoke('text').then((text) => {
          const myArray = text.split(":");
          cy.log(myArray[1]);
           sid = myArray[1].trim();
            });
            obj.sid=sid;
            cy.log(sid);
            return obj;
      }
      writeToXlsx(dataToWrite){
        cy.wrap(null).then(() => {
        write({ file: 'output4.xlsx', sheet: 'Sheet1', data: dataToWrite });
      })
      }
  }