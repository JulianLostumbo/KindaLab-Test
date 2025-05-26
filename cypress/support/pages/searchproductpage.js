class SearchPage {
    visitProductsPage() {
      cy.visit('https://www.automationexercise.com/products');
    }

    searchForProduct(productName) {
      cy.get('#search_product').type(productName);
      cy.get('#submit_search').click();
    }

    getSearchResults() {
      return cy.get('.features_items .productinfo.text-center');
    }

    getResultsMessage() {
      return cy.contains('Searched Products');
    }

    openFirstProductDetails() {
      cy.get('div.choose').first().click();
    }
}

export default new SearchPage();
