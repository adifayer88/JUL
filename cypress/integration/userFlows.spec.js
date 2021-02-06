context('User flows', () => {
    /* Due to time constraints, I didn't create a page file and placed the page objects there.
    * Same goes for creating a step folder, and step files. */
    let residenceButtonLocator = `[data-testid="store.companiesPortal.companyTypeButton.residence"]`;
    let officeButtonLocator = `[data-testid="store.companiesPortal.companyTypeButton.office"]`;
    let companyNameLocator = `[data-testid="store.companiesPortal.companyNameButton"]`;
    let featuredCategoriesLocator = `[data-testid="store.featuredCategories"] .MuiButtonBase-root`; // I would've used a test ID here instead
    let categoryName;
    let categoryItemLocator = ".MuiTypography-root.MuiListItemText-primary.MuiTypography-body1"; // I would've used a test ID here instead
    let categoriesDdLocator = '[data-testid="store.categoryPicker.categoriesButton"]';
    let categoryTitleLocator = ".MuiTypography-root.MuiTypography-body1"; // I would've used a test ID here instead

    beforeEach(() => {
        cy.visit('https://www.avonow.com');
    });

it(`Switch category`, () => {
        cy.get(residenceButtonLocator).click()
            .should('have.attr', 'data-selected', 'true');
        let company = cy.get(companyNameLocator).first();
        company.click().should('have.attr', 'href')
            .and("match", /.avonow.com/);
        cy.get(featuredCategoriesLocator).eq(1).scrollIntoView();

        cy.contains('Daily Deals').click();
        cy.get(categoryTitleLocator).should(($elements) => {
            categoryName = $elements.eq(4).text();
            expect(categoryName).to.contain('Daily Deals');
        });

        cy.get(categoriesDdLocator).click();
        cy.get(categoryItemLocator).then(($el) => {
            categoryName = $el.eq(2).text();
            $el.eq(2).click();
        })
        cy.get(categoryTitleLocator).should(($elements) => {
            expect($elements.eq(4)).to.contain(categoryName);
          });
      });

it(`Add item to chart, go to checkout`, () => {
    cy.get(officeButtonLocator).click()
        .should('have.attr', 'data-selected', 'true');
    let company = cy.get(companyNameLocator).first();
    company.click().should('have.attr', 'href')
        .and("match", /.avonow.com/);
    cy.get(featuredCategoriesLocator).eq(1).scrollIntoView();

    cy.contains('Daily Deals').click();
    cy.get(categoryTitleLocator).should(($elements) => {
        categoryName = $elements.eq(4).text();
        expect(categoryName).to.contain('Daily Deals');
      });
    cy.contains('Add to cart').click();
    cy.get('[id="shopping-cart-button"]').click();
    cy.get(`[data-testid="store.goToCheckout"]`).click();
    });
});
