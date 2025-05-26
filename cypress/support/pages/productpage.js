class ProductPage {
    getProductName(){
        return cy.get('.product-information h2')
    }

    addFirstProductToCart() {
        cy.get('.product-image-wrapper').first().trigger('mouseover');
        cy.contains('Add to cart').first().click();
    }

    clickContinueShopping() {
        cy.get('.btn-success').contains('Continue Shopping').click();
    }

    viewCart() {
        cy.get('a[href="/view_cart"]').click();
    }
}

export default new ProductPage();
