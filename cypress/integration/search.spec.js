describe('Search', () => {
    const searchTerm = 'cypress.io'
    beforeEach(() => {
        cy.intercept(
            'GET',
            `**?q=${searchTerm}**`
        ).as('getSearchResults')

        cy.visit('https://duckduckgo.com');

        cy.get('input[type="text"]')
            .as('searchField')
            .should('be.visible')
    })

    /* 
    it('type and hit enter', () => {
        cy.get('@searchField')
            .type(`${searchTerm}{enter}`)

        cy.wait('@getSearchResults')

        cy.get('.result')
            .should('have.length', 1)//ao menos 3 resultados no retorno
            .last()//pega ultimo elemento
            .should('contain', 'Mais')//contem string Mais
    })
*/
    it('type and click magnifying glass button', () => {
        cy.get('@searchField')
            .type(searchTerm)
        cy.get('input[type="submit"]')
            .should('be.visible')
            .click()

        cy.wait('@getSearchResults')
    })

    it('type and submit the form directly', () => {
        cy.get('@searchField')
            .type(searchTerm)
        cy.get('form').submit()

        cy.wait('@getSearchResults')
    })

    it('action searches by typing and selecting the first option from the list', () => {
        cy.get('@searchField')
            .type(`${searchTerm}{downarrow}{downarrow}{enter}`,{delay:1000})
        cy.get('input[type="submit"]')
            .should('be.visible')
            .click()

    })
})