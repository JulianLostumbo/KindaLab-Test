class CartPage {
    proceedToCheckout() {
      cy.contains('Proceed To Checkout').click();
    }
}

export default new CartPage();
