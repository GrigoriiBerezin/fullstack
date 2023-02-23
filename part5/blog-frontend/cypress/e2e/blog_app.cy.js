describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/users', { username: 'ping', name: 'Grigorii Berezin', password: 'terrano' })
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Log in application')
        cy.get('#username')
        cy.get('#password')
        cy.contains('login')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('ping')
            cy.get('#password').type('terrano')
            cy.contains('login').click()

            cy.contains('Grigorii Berezin logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('ping')
            cy.get('#password').type('wrong')
            cy.contains('login').click()

            cy.get('.error')
                .should('contain', 'invalid username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })
})
