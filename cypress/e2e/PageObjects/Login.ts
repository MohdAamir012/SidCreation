export class Login{
    userName :string;
    userPwd :string;

    constructor(name :string,pwd:string){
        this.userName=name;
        this.userPwd=pwd;
    }
    verifyExcel(){
        const excelFilePath ="cypress/fixtures/logindetails_new.xlsx";
        // cypress/fixtures/logindetails_new.xlsx
        const sheetName = "login";

        cy.task("generateJSONFromExcel", { excelFilePath, sheetName }).then(
          (user:any) => {

            console.log(user[0].UserName);
            console.log(user[0].Password);

            console.log(user[1].UserName);
            console.log(user[1].Password);

            console.log(user[2].UserName);
            console.log(user[2].Password);

            console.log(user[3].UserName);
            console.log(user[3].Password);
          }
        );
      }
    login(name:string,pwd:string){
        cy.get(this.userName).type(name).should('have.text',"Aamir");
        cy.get(this.userPwd).type(pwd);
    }
}