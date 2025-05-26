import signupPage from '../../support/pages/signuppage';
import userData from '../../fixtures/dataui.json';

describe('Signup Test on AutomationExercise', () => {
    const randomEmail = `${userData.name}${Date.now()}@test.com`;

    it('SignUp_AutomationExercise_001	-	Verify succesful sign up', () => {
        // Step 1: Go to SignUp page
        signupPage.visit();

        // Step 2: Sign up new user
        signupPage.enterName(userData.name);
        signupPage.enterEmail(randomEmail);
        signupPage.clickSignupButton();

        // Step 3: Complete account details
        signupPage.fillAccountDetails({
          title: userData.title,
          password: userData.password,
          day: userData.day,
          month: userData.month,
          year: userData.year
      });

      // Step 4: Complete address details
      signupPage.fillAddressDetails({
          firstName: userData.firstName,
          lastName: userData.lastName,
          company: userData.company,
          address1: userData.address1,
          country: userData.country,
          state: userData.state,
          city: userData.city,
          zipcode: userData.zipcode,
          mobile: userData.mobile
      });

      // Step 5: Confirm account creation
      signupPage.clickCreateAccount();

      // Step 6: Assert success message
      signupPage.getSuccessMessage().should('contain.text', 'Account Created!');
    });

    it('SignUp_AutomationExercise_003	-	Try to sign up with existent email', () => {
      // Step 1: Go to SignUp page
      signupPage.visit();

      // Step 2: Try to sign up a new user using data from other user
      signupPage.enterName(userData.name);
      signupPage.enterEmail(userData.validEmail);
      signupPage.clickSignupButton();

      // Step 3: Assert error message
      signupPage.getSignUpErrorLabel().should('contain.text', 'Email Address already exist!');
      });
});
