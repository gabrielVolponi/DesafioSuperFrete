describe('template spec', () => {
  const cepValidos = [
    '08090284',
    '05407002'
  ]

  const cepValidoRandom = cepValidos[Math.floor(Math.random()*cepValidos.length)]


  beforeAll(() => {

    cy.visit(Cypress.env('url')).then(() => {
      cy.wait(10000)
    })


  });

  describe('Pré-requisitos', () => {

    beforeEach(() => {
      //tomando locators
      cy.get('[alt="banner"]').as('bannerPromotion')
      cy.get('[id="originPostcode"]').as('inputCepOrigem')
      cy.get('[id="object_format"]').as('selectFormato')
      cy.get('[id="weight"]').as('selectPeso')

    });

    it('Validar Url', () => {
      cy.url().should('contains', Cypress.env('url'))
    });

    it('Validar Title', () => {
      cy.title().should('contains', 'SuperFrete')
    });

    it('Validar Banner ', () => {
      cy.get('@bannerPromotion').should('be.visible')
    });

    it('Validar input Cep Origem -  preenchimento ', () => {
      cy.get('@inputCepOrigem').should('be.visible').type(cepValidoRandom, { delay: 0 }).then(()=>{
        cy.get('@inputCepOrigem').then($inputCepOrigemVal => {
          const valorInputcepOrigem = $inputCepOrigemVal.val().replace(/[^0-9]/g, '')
          expect(valorInputcepOrigem).eq(cepValidoRandom)
        })
      })
    });

    it('Validar select peso - option', () => {
      // const = [

      // ]
      cy.get('@selectFormato').click().select('[data-value="2"]')
    });


  });
  //fluxos pré-requisitos


  //fluxos principais

  //fluxos exceção


})