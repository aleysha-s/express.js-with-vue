import {
  warnings,
  forgotPassword,
  login,
} from '@Labels/tags'

describe('forgot password test', () => {
  it('nav and validation input', () => {
    cy.eventHandler()
    cy.visit('/')
    cy.wait(500)
    cy.get(login.forgotPassword)
      .click()
    cy.wait(500)
    cy.url()
      .should('include', '/forgotPassword')
    cy.wait(200)
    cy.get(warnings.massage)
      .should('not.exist')
    cy.get(forgotPassword.email)
      .type('INVALID EMAIL')
      .should('have.value', 'INVALID EMAIL')
    cy.get(forgotPassword.sendBtn)
      .click()
    cy.get(warnings.massage)
      .should('be.visible')
      .and('have.length', 1)
    cy.get(forgotPassword.cancelBtn)
      .click()
    cy.wait(200)
    cy.url()
      .should('include', '/login')
  })
  it('positive test', () => {
    cy.eventHandler()
    cy.visit('/forgotPassword')
    cy.wait(500)
    cy.get(forgotPassword.email)
      .type('muhammad.ahmad@cellsmartpos.com')
    cy.get(forgotPassword.sendBtn)
      .click()
    cy.wait(500)
    cy.get(forgotPassword.loginBtn)
      .should('be.visible')
      .click()
    cy.wait(500)
    cy.url()
      .should('include', '/login')
  })
})
