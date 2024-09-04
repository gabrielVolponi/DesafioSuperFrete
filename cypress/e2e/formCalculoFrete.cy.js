describe('template spec', () => {
  const cepValidos = [
    '08090284',
    '05407002'
  ]

  const cepValidoRandom = cepValidos[Math.floor(Math.random() * cepValidos.length)]

  const dadosDesafio = {
    altura: '2',
    largura: '11',
    comprimento: '16',
    peso: '300'
  }

  beforeEach(() => {
    cy.visit(Cypress.env('url')).then(() => {
      cy.wait(10000)
    })
  });


  //fluxos pré-requisitos
  describe('Pré-requisitos', () => {

    beforeEach(() => {
      //tomando locators
      cy.get('[alt="banner"]').as('bannerPromotion')
      cy.get('[id="originPostcode"]').as('inputCepOrigem')
      cy.get('[id="object_format"]').as('selectFormato')
      cy.get('[id="weight"]').as('selectPeso')
      cy.get('[id="packageHeight"]').as('inputAltura')
      cy.get('[id="packageWidth"]').as('inputLargura')
      cy.get('[id="packageDepth"]').as('inputComprimento')
      cy.get('[id="destinationPostcode"]').as('inputCepDestino')
      cy.contains('button', 'Limpar').as('btnLimpar')
      cy.contains('button', 'Salvar').as('btnSalvar')

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
      cy.get('@inputCepOrigem').should('be.visible').type(cepValidoRandom, { delay: 0 }).then(() => {
        cy.get('@inputCepOrigem').then($inputCepOrigemVal => {
          const valorInputcepOrigem = $inputCepOrigemVal.val().replace(/[^0-9]/g, '')
          expect(valorInputcepOrigem).eq(cepValidoRandom)
        })
      })
    });

    it('Validar select Formato - option', () => {
      cy.get('@selectFormato').click().then(() => {
        cy.get('[data-value="2"]').as('option2').click()
      })
    });

    it('Validar select Peso - Option', () => {
      cy.get('@selectPeso').click().then(() => {
        cy.get('[data-value="0.3"]').as('optionAte300g').click()
      })
    });

    it('Validar select Peso - Digitado', () => {
      cy.get('@selectPeso').click().then(() => {
        cy.get('[data-value="userWrite"]').as('valorDigitado')
        cy.get('@valorDigitado').click()
      }).then(() => {
        cy.get('[id="userWrittenWeight"]').as('inputPesoDigitado').type(dadosDesafio.peso, { delay: 0 })
      })
    });

    it('Validar input Altura - preenchimento', () => {
      cy.get('@inputAltura').type(dadosDesafio.altura, { delay: 0 }).then($inputAltura => {
        const valorInputAltura = $inputAltura.val()
        expect(valorInputAltura).eq(dadosDesafio.altura)
      })
    });

    it('Validar input Largura - preenchimento', () => {
      cy.get('@inputLargura').type(dadosDesafio.largura, { delay: 0 }).then($inputLargura => {
        const valorInputLargura = $inputLargura.val()
        expect(valorInputLargura).eq(dadosDesafio.largura)
      })
    });

    it('Validar input Comprimento - preenchimento', () => {
      cy.get('@inputComprimento').type(dadosDesafio.comprimento, { delay: 0 }).then($inputComprimento => {
        const valorInputComprimento = $inputComprimento.val()
        expect(valorInputComprimento).eq(dadosDesafio.comprimento)
      })
    });

    describe('Seguro, aviso e mão própria', () => {
      beforeEach(() => {
        cy.contains('Seguro, aviso e mão própria').as('formSeguroMaoPropria').click()

        //tomada locators
        cy.get('[value="self_hand"]').as('switchMaoPropria')
        cy.get('[value="acknowledgment_of_receipt"]').as('switchAvisoRecebimento')
        cy.get('[value="value_declaration"]').as('switchDeclaracaoValor')
      });

      it('Check switch Mao Propria', () => {
        cy.get('@switchMaoPropria').check().then(() => {
          cy.get('@switchMaoPropria').should('be.checked')
        })
      });

      it('Check switch Aviso de Recebimento', () => {
        cy.get('@switchAvisoRecebimento').check().then(() => {
          cy.get('@switchAvisoRecebimento').should('be.checked')
        })
      });

      it('Check switch Decalração Valor - Seguro', () => {
        cy.get('@switchDeclaracaoValor').check().then(() => {
          cy.get('@switchDeclaracaoValor').should('be.checked')
        })
      });



    });

    it('Validar input Cep Destino -  preenchimento', () => {
      cy.get('@inputCepDestino').should('be.visible').type(cepValidoRandom, { delay: 0 }).then(() => {
        cy.get('@inputCepDestino').then($inputCepDestinoVal => {
          const valorInputCepDestino = $inputCepDestinoVal.val().replace(/[^0-9]/g, '')
          expect(valorInputCepDestino).eq(cepValidoRandom)
        })
      })
    });

    it('Click btn "Limpar"', () => {
      cy.get('@btnLimpar').should('be.visible').click()
    });

    it('Texto btn "Limpar"', () => {
      cy.get('@btnLimpar').contains('Limpar')

    });

    it('Visibilidade btn "Limpar"', () => {
      cy.get('@btnLimpar').should('be.visible')
    });

    it('Click btn "Salvar"', () => {
      cy.get('@btnSalvar').should('be.visible').click()
    });

    it('Texto btn "Salvar"', () => {
      cy.get('@btnSalvar').contains('Salvar')

    });

    it('Visibilidade btn "Salvar"', () => {
      cy.get('@btnSalvar').should('be.visible')
    });


  });

  //fluxos principais

  //fluxos exceção


})