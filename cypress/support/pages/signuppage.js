class SignupPage {
    visit() {
      cy.visit('https://www.automationexercise.com/login');
    }

    enterName(name) {
      cy.get('input[data-qa="signup-name"]').type(name);
    }

    enterEmail(email) {
      cy.get('input[data-qa="signup-email"]').type(email);
    }

    clickSignupButton() {
      cy.get('button[data-qa="signup-button"]').click();
    }

    getSignUpErrorLabel() {
      return cy.get('p[style="color: red;"]')
    }

    fillAccountDetails({ title, password, day, month, year }) {
      if (title === 'Mr') {
        cy.get('#id_gender1').check();
      } else {
        cy.get('#id_gender2').check();
      }
      cy.get('#password').type(password);
      cy.get('#days').select(day);
      cy.get('#months').select(month);
      cy.get('#years').select(year);
    }

    fillAddressDetails({ firstName, lastName, company, address1, country, state, city, zipcode, mobile }) {
      cy.get('#first_name').type(firstName);
      cy.get('#last_name').type(lastName);
      cy.get('#company').type(company);
      cy.get('#address1').type(address1);
      cy.get('#country').select(country);
      cy.get('#state').type(state);
      cy.get('#city').type(city);
      cy.get('#zipcode').type(zipcode);
      cy.get('#mobile_number').type(mobile);
    }

    clickCreateAccount() {
      cy.get('button[data-qa="create-account"]').click();
    }

    getSuccessMessage() {
      return cy.get('h2[data-qa="account-created"]');
    }
}

export default new SignupPage();
