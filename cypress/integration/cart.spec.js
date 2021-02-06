context('Cart tests', () => {
    beforeEach(() => {
        cy.visit('https://www.avonow.com');
        cy.get(`[data-testid="store.companiesPortal.companyTypeButton.residence"]`).click()
            .should('have.attr', 'data-selected', 'true');
        let company = cy.get(`[data-testid="store.companiesPortal.companyNameButton"]`).first();
        company.click().should('have.attr', 'href')
            .and("match", /.avonow.com/);
        cy.get(`[data-testid="store.featuredCategories"] .MuiButtonBase-root`).eq(1).scrollIntoView();
        cy.contains('Daily Deals').click();
        cy.get(categoryTitleLocator).should(($elements) => {
            categoryName = $elements.eq(4).text();
            expect(categoryName).to.contain('Daily Deals');
        });
    });

    it(`Add item to cart`, () => {
        cy.contains('Add to cart').click();
        expect(cy.contains(`.MuiButtonBase-root .MuiButton-label`, 1),
            "Expected add to cart button to be replaced with added item count.").to.not.be.undefined;
        expect(cy.contains(`.MuiBadge-anchorOriginTopRightRectangle`, 1),
            "Expected the cart to have 1 item added badge").to.not.be.undefined;
    });

    it(`Remove item from cart`, () => {
        cy.contains('Add to cart').click();
        cy.get(`.MuiButtonBase-root .MuiButton-label`).eq(1).click();
        cy.get(`.MuiBadge-anchorOriginTopRightRectangle`).should('have.class','MuiBadge-invisible');
        expect(cy.contains('Add to cart')).not.to.not.be.undefined;
    });

    it(`Add the same item twice to cart`, () => {
        cy.contains('Add to cart').eq(0).click();
        cy.get(`.MuiButtonBase-root .MuiButton-label`).eq(3).click();
        expect(cy.contains(`.MuiButtonBase-root .MuiButton-label`, 2),
            "Expected add to cart button to be replaced with added item count.").to.not.be.undefined;
        expect(cy.contains(`.MuiBadge-anchorOriginTopRightRectangle`, 2),
            "Expected the cart to have 2 items added badge").to.not.be.undefined;    });
    });
