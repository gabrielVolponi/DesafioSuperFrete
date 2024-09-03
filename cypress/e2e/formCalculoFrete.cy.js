describe('template spec', () => {

  beforeEach(() => {
      cy.visit(Cypress.env('url')).then(()=>{
        cy.wait(10000)
      })
  });

  //fluxos pré-requisitos
  it('Validar Url', () => {
    cy.url().should('contains', Cypress.env('url'))
  });

  it('Validar Title', () => {
    cy.title().should('contains', 'SuperFrete')
  });

  //fluxos principais

  //fluxos exceção


})