describe('Carousel test', () => {
    it('should have three pages and navigate correctly', () => {
        cy.viewport(1000, 480)

        cy.visit('http://localhost:3000/')

        cy.get('[id^=leftArrow]').should('not.exist');

        cy.get('[id^=CarouselIndicator]').children().should('have.length', 3)

        cy.get('[id^=tab1]').click()

        cy.get('[id^=tab2]').click()

        cy.get('[id^=rightArrow]').should('not.exist');

        cy.get('[id^=tab0]').click()

        cy.get('[id^=rightArrow]').click()

        cy.get('[id^=tab0]').click()

        cy.get('[id^=leftArrow]').should('not.exist');

    })
})

describe('Carousel page test', () => {
    it('should have 12 pages', () => {
        cy.viewport(400, 480)

        cy.visit('http://localhost:3000/')

        cy.get('[id^=CarouselIndicator]').children().should('have.length', 12)
    })
})

describe('Carousel page test', () => {
    it('should have 6 pages', () => {
        cy.viewport(600, 480)

        cy.visit('http://localhost:3000/')

        cy.get('[id^=CarouselIndicator]').children().should('have.length', 6)
    })
})
