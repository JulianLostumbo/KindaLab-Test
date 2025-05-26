import searchProductPage from '../../support/pages/searchproductpage';
import productPage from '../../support/pages/productpage';

describe('Search Product Test', () => {
    it('SearchProducts_AutomationExercise_007	-	Verify searching a product by name', () => {
      const productName = 'T-Shirt';

      // Step 1: Go to Products page
      searchProductPage.visitProductsPage();

      // Step 2: Search for product
      searchProductPage.searchForProduct(productName);

      // Step 3: Validate search results
      searchProductPage.getResultsMessage().should('be.visible');
      searchProductPage.getSearchResults().should('exist');
      searchProductPage.getSearchResults().first().should('contain.text', productName);

      // Step 4: Open product page
      searchProductPage.openFirstProductDetails();

      // Step 5: Assert product name
      productPage.getProductName().should('contain.text', productName)
    });
});
