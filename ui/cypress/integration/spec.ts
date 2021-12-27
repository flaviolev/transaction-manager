Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#login').click()
  cy.url().should('contain', '/dashboard')
})

Cypress.Commands.add('register', (username, email, password) => {
  cy.visit('/register')
  cy.get('#username').type(username)
  cy.get('#email').type(email)
  cy.get('#password').type(password)
  cy.get('#register').click()
  const userExist = cy.request(`http://localhost:8080/api/user/${username}`)
  userExist
    ? cy.url().should('contain', '/register')
    : cy.url().should('contain', '/login')
})
Cypress.Commands.add('createPayment', (to, amount) => {
  cy.visit('/dashboard')
  cy.get('#to').type(to)
  cy.get('#amount').type(amount)

  cy.request(`http://localhost:8080/api/user/${to}`).then((res) => {
    if (!!res.body) {
      cy.get('#pay').should('not.be.disabled')
      cy.get('#pay').click()
      cy.get('table').contains('td:nth-child(2)', to).should('be.visible')
    } else {
      cy.get('#pay').should('be.disabled')
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
    cy.get('#logout').click()
    cy.url().should('contain', '/login')
  })

  it('Visits the transaction page', () => {
    cy.visit('/transaction')
    cy.contains('Transactions')
  })

  it('Click all transaction and visits the transaction page', () => {
    cy.visit('/dashboard')
    cy.get('#alltransactions').click()
    cy.url().should('contain', '/transactions')
  })
  it('Tries to create a new transaction', () => {
    cy.createPayment('user2', 10)
  })
})
