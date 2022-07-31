describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Cypress tester',
      username: 'cypress',
      password: 'cypress'
    }

    cy.request('POST', 'http://localhost:3000/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form present', function () {
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('Login', function () {
    it('Login with correct data', function () {
      cy.get('#username').type('cypress')
      cy.get('#password').type('cypress')
      cy.get('#login-button').click()
      cy.contains('Cypress tester logged-in')
    })

    it('Login with incorrect data fails', function () {
      cy.get('#username').type('cypress')
      cy.get('#password').type('bleh')
      cy.get('#login-button').click()

      cy.get('#error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Cypress tester logged-in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cypress', password: 'cypress' })
    })

    it('New blog can be created', function () {
      cy.contains('Add blog').click()
      cy.get('#title').type('Cypress blog')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('example.org')
      cy.get('#add-button').click()
    })

    it('Blog can be liked', function () {
      cy.contains('Add blog').click()
      cy.get('#title').type('Cypress blog')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('example.org')
      cy.get('#add-button').click()

      cy.visit('http://localhost:3000')

      cy.contains('Cypress blog').parent().as('blog')
      cy.get('@blog').contains('View').click()
      cy.get('@blog').contains('Like').click()
      cy.contains('1')
    })

    it('Blog can be deleted', function () {
      cy.contains('Add blog').click()
      cy.get('#title').type('Cypress blog')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('example.org')
      cy.get('#add-button').click()

      cy.visit('http://localhost:3000')

      cy.contains('Cypress blog')
      cy.contains('View').click()
      cy.get('#remove').click()
      cy.get('#blogContainer').should('not.contain', 'Cypress blog')
    })
  })

  describe('Blog ordering', function () {
    beforeEach(function () {
      cy.login({ username: 'cypress', password: 'cypress' })
      cy.createBlog({ author: 'Ble ble', title: 'bleble1', url: 'example.org' })
      cy.createBlog({ author: 'Ble ble', title: 'bleble2', url: 'example.org' })
      cy.createBlog({ author: 'Ble ble', title: 'bleble3', url: 'example.org' })

      cy.contains('bleble1').parent().as('blog1')
      cy.contains('bleble2').parent().as('blog2')
      cy.contains('bleble3').parent().as('blog3')
    })

    it('Ordered by number of likes', function () {
      cy.get('@blog1').contains('View').click()
      cy.get('@blog1').contains('Like').as('like1')
      cy.get('@blog2').contains('View').click()
      cy.get('@blog2').contains('Like').as('like2')
      cy.get('@blog3').contains('View').click()
      cy.get('@blog3').contains('Like').as('like3')

      cy.get('@like2').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('3')
        cy.wrap(blogs[1]).contains('2')
        cy.wrap(blogs[2]).contains('1')
      })
    })
  })

})