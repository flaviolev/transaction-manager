Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#login').click()
  cy.url().should('contain', '/dashboard')
})

describe('Login Test', () => { 
  it('Visits the root path', () => {
    cy.visit('/')
    cy.contains('Finance Manager')
    cy.url().should('contain', '/login')
  })
})

describe('Login Test', () => { 
  beforeEach(() => {
    cy.login('user1', '123456')
  })

  afterEach(() => {
    cy.get("#logout").click()
    cy.url().should('contain', '/login')
  })

  it('Visits the transaction page', () => {
    cy.visit('/transaction')
    cy.contains('Transactions')
  })
})