import loginPage from '../../support/pages/loginpage';
import homePage from '../../support/pages/homepage';
import userData from '../../fixtures/dataui.json';

describe('Login Test on AutomationExercise', () => {
    it('Login_AutomationExercise_001	-	Verify successful login using valid credentials', () => {
      // Step 1: Go to Login page
      loginPage.visit();

      // Step 2: Login using valid credentials
      loginPage.enterEmail(userData.validEmail);
      loginPage.enterPassword(userData.validPassword);
      loginPage.clickLogin();

      // Step 3: Assert successful login
      homePage.getLogoutButton().should('be.visible');
      homePage.getLoggedInAsLabel().should('contain.text', userData.username)
    });

    it('Login_AutomationExercise_002	-	Verify error displayed when trying to login using invalid credentials', () => {
      // Step 1: Go to Login page
      loginPage.visit();

      // Step 2: Try to login using invalid credentials
      loginPage.enterEmail(userData.invalidEmail);
      loginPage.enterPassword(userData.invalidPassword);
      loginPage.clickLogin();
      
      // Step 3: Assert error message
      loginPage.getErrorMessage().should('be.visible', 'Your email or password is incorrect!');
    });
});