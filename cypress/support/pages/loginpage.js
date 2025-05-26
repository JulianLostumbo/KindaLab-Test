class LoginPage {
    visit() {
      cy.visit('https://www.automationexercise.com/login');
    }

    enterEmail(email) {
      cy.get('input[data-qa="login-email"]').type(email);
    }

    enterPassword(password) {
      cy.get('input[data-qa="login-password"]').type(password);
    }

    clickLogin() {
      cy.get('button[data-qa="login-button"]').click();
    }

    getErrorMessage() {
      return cy.get('.login-form p');
    }

    login(email, password){
      this.enterEmail(email);
      this.enterPassword(password);
      this.clickLogin();
    }
}

export default new LoginPage();