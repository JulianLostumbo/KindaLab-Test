class CheckoutPage {
    placeOrder(comment) {
      cy.get('textarea[name="message"]').type(comment);
      cy.contains('Place Order').click();
    }

    enterPaymentDetails({ name, cardNumber, cvc, expiryMonth, expiryYear }) {
      cy.get('input[name="name_on_card"]').type(name);
      cy.get('input[name="card_number"]').type(cardNumber);
      cy.get('input[name="cvc"]').type(cvc);
      cy.get('input[name="expiry_month"]').type(expiryMonth);
      cy.get('input[name="expiry_year"]').type(expiryYear);
    }

    confirmPayment() {
      cy.get('#submit').click();
    }
}

export default new CheckoutPage();
