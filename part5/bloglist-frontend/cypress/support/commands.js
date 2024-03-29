const storageKey = 'loggedUser'

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3000/api/login', { username, password })
    .then(({ body }) => {
      localStorage.setItem(storageKey, JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url:'http://localhost:3000/api/blogs',
    method:'POST',
    body: {title, author, url},
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem(storageKey)).token}`
    }
  })

  cy.visit('http://localhost:3000')
})