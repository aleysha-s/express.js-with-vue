import {
  login,
  warnings,
  alert,
  menu,
} from '@Labels/tags'

beforeEach(() => {
  cy.eventHandler()
  cy.visit('/')
})

describe('login main page test ', () => {
  it('visit page and check visibility', () => {
    cy.wait(200)
    cy.url()
      .should('include', '/login')
    cy.get(login.email)
      .should('be.visible')
    cy.get(login.password)
      .should('be.visible')
    cy.get(login.submitBtn)
      .should('be.visible')
    cy.get(login.forgotPassword)
      .should('be.visible')
    cy.get(login.signUp)
      .should('be.visible')
  })
  it('validation test for input', () => {
    cy.wait(200)
    cy.get(warnings.massage)
      .should('not.exist')
    cy.get(login.submitBtn)
      .click()
    cy.wait(200)
    cy.get(warnings.massage)
      .should('be.visible')
      .and('have.length', 2)
    cy.get(login.email)
      .type(Cypress.env('email'))
      .should('have.value', Cypress.env('email'))
    cy.wait(200)
    cy.get(warnings.massage)
      .should('have.length', 1)
    cy.wait(200)
    cy.get(login.email)
      .clear()
    cy.wait(100)
    cy.get(login.password)
      .type(Cypress.env('password'))
      .should('have.value', Cypress.env('password'))
    cy.get(warnings.massage)
      .should('have.length', 1)
  })
  it('typing wrong credentials and check for alart', () => {
    cy.wait(500)
    cy.get(login.email)
      .type('wrong-email@wrong-domain.com')
    cy.get(login.password)
      .type('wrong-password')
    cy.get(login.submitBtn)
      .click()
    cy.get(alert.confirm)
      .should('be.visible')
      .click()
  })
  it('login to register (positive testing)', () => {
    cy.wait(500)
    cy.get(login.email)
      .type(Cypress.env('email'))
    cy.get(login.password)
      .type(Cypress.env('password'))
    cy.get(login.submitBtn)
      .click()
    cy.wait(500)
    cy.url()
      .should('include', '/location/dashboard')
  })
})

describe('login and logout Test', () => {
  it('logout from the dashboard', () => {
    cy.wait(500)
    cy.get(login.email)
      .type(Cypress.env('email'))
    cy.get(login.password)
      .type(Cypress.env('password'))
    cy.get(login.submitBtn)
      .click()
    cy.wait(500)
    cy.get(menu.user.mainBtn)
      .click()
    cy.get(menu.user.logout)
      .click()
    cy.wait(500)
    cy.url()
      .should('include', '/login')
  })
})
