Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')
  cy.get('[data-cy=username]').type(username)
  cy.get('[data-cy=password]').type(password)
  cy.get('[data-cy=login]').click()
  cy.url().should('contain', '/dashboard')
})

Cypress.Commands.add('register', (username, email, password) => {
  cy.visit('/register')
  cy.get('[data-cy=username]').type(username)
  cy.get('[data-cy=email]').type(email)
  cy.get('[data-cy=password]').type(password)
  cy.get('[data-cy=register]').click()
  const userExist = cy.request(`http://localhost:8080/api/user/${username}`)
  userExist
    ? cy.url().should('contain', '/register')
    : cy.url().should('contain', '/login')
})
Cypress.Commands.add('createPayment', (to, amount) => {
  cy.visit('/dashboard')
  cy.get('[data-cy=to]').type(to)
  cy.get('[data-cy=amount]').type(amount)

  cy.request(`http://localhost:8080/api/user/${to}`).then((res) => {
    if (!!res.body) {
      cy.get('[data-cy=pay]').should('not.be.disabled')
      cy.get('[data-cy=pay]').click()
      cy.get('table').contains('td:nth-child(2)', to).should('be.visible')
    } else {
      cy.get('[data-cy=pay]').should('be.disabled')
    }
  })
})

describe('Login Test', () => {
  it('Visits the root path', () => {
    cy.visit('/')
    cy.contains('Finance Manager')
    cy.url().should('contain', '/login')
  })
})

describe('Login Test', () => {
  before(() => {
    cy.register('user10', 'user10@email.com', '123456')
  })
  beforeEach(() => {
    cy.login('user10', '123456')
  })

  afterEach(() => {
    cy.get('[data-cy=logout]').click()
    cy.url().should('contain', '/login')
  })

  it('Visits the transaction page', () => {
    cy.visit('/transaction')
    cy.contains('Transactions')
  })

  it('Click all transaction and visits the transaction page', () => {
    cy.visit('/dashboard')
    cy.get('[data-cy=alltransactions]').click()
    cy.url().should('contain', '/transactions')
  })
  it('Tries to create a new transaction', () => {
    cy.createPayment('user2', 10)
  })
})
