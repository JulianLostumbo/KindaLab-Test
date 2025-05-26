class HomePage {
    visit() {
      cy.visit('https://www.automationexercise.com');
    }

    goToProducts() {
      cy.get('a[href="/products"]').click();
    }

    getLoggedInAsLabel() {
      return cy.get('.navbar-nav b');
    }

    getLogoutButton() {
      return cy.get('a[href="/logout"]');
    }

    viewCart() {
          cy.get('a[href="/view_cart"]').first().click();
      }
}

export default new HomePage();
