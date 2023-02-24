describe('Blog app', function () {
    beforeEach(function () {
        cy.resetDb()
        cy.createUser({
            username: 'ping',
            name: 'Grigorii Berezin',
            password: 'terrano'
        })
        cy.createUser({
            username: 'root',
            name: 'Superuser',
            password: 'password'
        })
        cy.visit('')
    })

    it('Login form is shown', function () {
        cy.contains('Log in to application')
        cy.get('#username')
        cy.get('#password')
        cy.contains('login')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('ping')
            cy.get('#password').type('terrano')
            cy.contains('login').click()

            cy.contains('Grigorii Berezin logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('ping')
            cy.get('#password').type('wrong')
            cy.contains('login').click()

            cy.get('.error')
                .should('contain', 'Invalid username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'ping', password: 'terrano' })
        })

        it('A blog can be created', function () {
            cy.contains('new blog').click()

            cy.get('#title').type('first blog')
            cy.get('#author').type('tester')
            cy.get('#url').type('empty')
            cy.contains('create').click()

            cy.contains('first blog by tester')
        })

        describe('And blog has been created', function () {
            beforeEach(function () {
                cy.addBlog({ title: 'first blog', author: 'tester', url: 'url#1' })
            })

            it('Can be liked', function () {
                cy.contains('view').click()
                cy.contains('like').click()

                cy.contains('likes: 1')
            })

            it('The creator can delete it', function () {
                cy.contains('view').click()
                cy.contains('delete').click()

                cy.contains('removed')
                cy.contains(/^first blog by tester$/).should('not.exist')
            })

            it('A non creator can\'t delete it', function () {
                cy.login({ username: 'root', password: 'password' })

                cy.contains('view').click()
                cy.contains('delete').should('not.exist')
            })
        })

        describe('And few blogs are created', function () {
            beforeEach(function () {
                cy.addBlog({ title: 'first blog', author: 'tester', url: 'url#1' })
                cy.addBlog({ title: 'second blog', author: 'tester', url: 'url#2', totalLikes: 10 })
                cy.addBlog({ title: 'third blog', author: 'tester', url: 'url#2', totalLikes: 6 })
            })

            it('Blogs are sorted by likes count', function () {
                cy.get('.blog').eq(0).should('contain', 'second blog')
                cy.get('.blog').eq(1).should('contain', 'third blog')
                cy.get('.blog').eq(2).should('contain', 'first blog')
            })
        })
    })
})
