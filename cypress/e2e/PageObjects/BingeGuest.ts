export class BingeGuest{
  langDrawer : Array<string> =['Hindi','Bengali','English','Marathi','Telugu','Kannada','Tamil','Punjabi','Malayalam','Gujarati','Odia','Bhojpuri','Assamese']
    data:any;        
    
  verifyExcel(){
    this.data = cy.task('readXlsx',{file:'cypress/fixtures/search.xlsx',sheet:'Sheet1'})
    .then((rows)=>{this.data = rows})
  }
    before(){
        cy.visit('/')
    }
    languageDrawer(){
        cy.get('button.selected-language-btn').should('be.disabled');
        for (let index = 0; index < this.langDrawer.length; index++) {
            cy.get('div.languageId-container>div>p').eq(index).should('have.text',this.langDrawer[index])
            if(this.langDrawer[index]==='Hindi'||this.langDrawer[index]==='English'||this.langDrawer[index]==='Telugu'||this.langDrawer[index]==='Tamil')
            cy.get('div.languageId-container>div>p').eq(index).click();
        }
        cy.get('button.selected-language-btn').should('be.enabled').click();
    }
    marketingDrawer(){
        cy.reload();
        cy.wait(1000)
        cy.get('div.heading-container>p>pre').should('have.text','Enjoy OTT entertainment from \n 22+ apps in 1 app');
        cy.get('div.partner-container>div>div').should('have.length','8');
        cy.get('button.primary-btn').eq(0).should('have.text','Explore')
        cy.get('button.primary-btn').eq(1).should('have.text','Do It Later')
        cy.get('button.primary-btn').eq(1).click();
    }
    login(){
        cy.get('div.logged-out-profile').click();
        cy.get('div.top-menu-wrapper>span.login-btn').first().click();
        cy.wait(1000)
        cy.get('div.login-title-web>p').should('have.text','Login');
        const e =9999999929;
        cy.get('input.initial-val-input').invoke('val','9999149870').trigger('change').should('have.value','9999149870')
    }
    searchPartners(){
        cy.wait(1000)
        for (let index = 0; index < this.data.length; index++) {
            const element = this.data[index].Partners;
            cy.get('i.icon-icon-search-upd').click()
            cy.get('input#search-input').type(element);
            cy.wait(1000)
            cy.get('span.highlight-text').first().should('have.text',element)
            cy.get('input#search-input').clear()
        }
    }
}