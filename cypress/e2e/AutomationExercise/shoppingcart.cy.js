import homePage from '../../support/pages/homepage';
import productPage from '../../support/pages/productpage';
import cartPage from '../../support/pages/cartpage';
import loginPage from '../../support/pages/loginpage';
import checkoutPage from '../../support/pages/checkoutpage';
import userData from '../../fixtures/dataui.json';

describe('E2E Purchase Test', () => {
  it('ProductPurchase_AutomationExercise_009	-	Verify the purchase of a single product', () => {
      // Step 1: Login
      loginPage.visit();
      loginPage.login(userData.validEmail, userData.validPassword);
      
      // Step 2: Go to products
      homePage.goToProducts();

      // Step 3: Add product to cart and view cart
      productPage.addFirstProductToCart();
      productPage.clickContinueShopping();
      homePage.viewCart();

      // Step 4: Proceed to checkout
      cartPage.proceedToCheckout();

      // Step 5: Place order
      checkoutPage.placeOrder('Please deliver ASAP.');

      // Step 6: Payment
      checkoutPage.enterPaymentDetails({
        name: userData.name,
        cardNumber: userData.cardNumber,
        cvc: userData.cvc,
        expiryMonth: userData.expiryMonth,
        expiryYear: userData.expiryYear,
      });

      checkoutPage.confirmPayment();

      // Step 7: Assert payment completed
      cy.url().should('include', 'payment_done');
    });
});
