//gerando massa de teste
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

describe('template spec', () => {

  beforeEach(() => {
    cy.intercept('GET', '**/*.png', { statusCode: 200, body: '' });  // Bloqueia imagens PNG
    cy.intercept('GET', '**/*.jpg', { statusCode: 200, body: '' });  // Bloqueia imagens JPG
    cy.intercept('GET', '**/*.css', { statusCode: 200, body: '' });  // Bloqueia arquivos CSS
    cy.clearCookies();
    cy.clearLocalStorage();

    // Visita a URL e espera 10 segundos
    cy.visit(Cypress.env('url')).then(() => {
      cy.wait(10000);  // Aguarda 10 segundos
    }).then(() => {
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
      cy.get('[data-cy="calculator-submit"]').as('btnCalcular')

    })
  });

  //fluxos pré-requisitos
  describe.skip('Pré-requisitos', () => {

    it('Validar Url', () => {
      cy.url().should('contains', Cypress.env('url'))
    });

    it('Validar Title', () => {
      cy.title().should('contains', 'SuperFrete')
    });

    it('Validar Banner ', () => {
      cy.get('@bannerPromotion').should('be.visible')
    });

    it('Validar pre-requisitos form', () => {
      cy.get('@inputCepOrigem').should('be.visible').type(cepValidoRandom, { delay: 0 }).then(() => {
        cy.get('@inputCepOrigem').then($inputCepOrigemVal => {
          const valorInputcepOrigem = $inputCepOrigemVal.val().replace(/[^0-9]/g, '')
          expect(valorInputcepOrigem).eq(cepValidoRandom)
        })
      })


      cy.get('@selectPeso').click().then(() => {
        cy.get('[data-value="userWrite"]').as('valorDigitado')
        cy.get('@valorDigitado').click()
      }).then(() => {
        cy.get('[id="userWrittenWeight"]').as('inputPesoDigitado').type(dadosDesafio.peso, { delay: 0 })
      })

      cy.get('@inputAltura').type(dadosDesafio.altura, { delay: 0 }).then($inputAltura => {
        const valorInputAltura = $inputAltura.val()
        expect(valorInputAltura).eq(dadosDesafio.altura)
      })

      cy.get('@inputLargura').type(dadosDesafio.largura, { delay: 0 }).then($inputLargura => {
        const valorInputLargura = $inputLargura.val()
        expect(valorInputLargura).eq(dadosDesafio.largura)
      })

      cy.get('@inputComprimento').type(dadosDesafio.comprimento, { delay: 0 }).then($inputComprimento => {
        const valorInputComprimento = $inputComprimento.val()
        expect(valorInputComprimento).eq(dadosDesafio.comprimento)
      })

      cy.get('@inputCepDestino').should('be.visible').type(cepValidoRandom, { delay: 0 }).then(() => {
        cy.get('@inputCepDestino').then($inputCepDestinoVal => {
          const valorInputCepDestino = $inputCepDestinoVal.val().replace(/[^0-9]/g, '')
          expect(valorInputCepDestino).eq(cepValidoRandom)
        })
      })

      cy.get('@btnLimpar').should('be.visible').click()

      cy.get('@btnLimpar').contains('Limpar')

      cy.get('@btnLimpar').should('be.visible')

      cy.get('@btnSalvar').should('be.visible').click()

      cy.get('@btnSalvar').contains('Salvar')

      cy.get('@btnSalvar').should('be.visible')

    });

  });

  //fluxos principais
  describe('Fluxo Principal', () => {
    it.only('Preenchimento Form Dados Válidos', () => {
      cy.get('@inputCepOrigem').should('be.visible').type(cepValidos[0], { delay: 0 })

      cy.get('@selectPeso').click().then(() => {
        cy.get('[data-value="userWrite"]').as('valorDigitado')
        cy.get('@valorDigitado').click()
      }).then(() => {
        cy.get('[id="userWrittenWeight"]').as('inputPesoDigitado').type(dadosDesafio.peso, { delay: 0 })
      })

      cy.get('@inputAltura').type(dadosDesafio.altura, { delay: 0 }).then($inputAltura => {
        const valorInputAltura = $inputAltura.val()
        expect(valorInputAltura).eq(dadosDesafio.altura)
      })

      cy.get('@inputLargura').type(dadosDesafio.largura, { delay: 0 }).then($inputLargura => {
        const valorInputLargura = $inputLargura.val()
        expect(valorInputLargura).eq(dadosDesafio.largura)
      })

      cy.get('@inputComprimento').type(dadosDesafio.comprimento, { delay: 0 }).then($inputComprimento => {
        const valorInputComprimento = $inputComprimento.val()
        expect(valorInputComprimento).eq(dadosDesafio.comprimento)
      })

      cy.get('@inputCepDestino').should('be.visible').type(cepValidos[1], { delay: 0 }).then(() => {
        cy.get('@inputCepDestino').then($inputCepDestinoVal => {
          const valorInputCepDestino = $inputCepDestinoVal.val().replace(/[^0-9]/g, '')
          expect(valorInputCepDestino).eq(cepValidoRandom)
        })
      })

      cy.get('@btnCalcular').should('be.visible').click()
    })


  });

  //fluxos exceção
  describe('Fluxos Excessão', () => {
    it('Envio form com Altura (<0,4cm ou >150cm)', () => {
      cy.get('@inputAltura').type('0', { delay: 0 }).then($inputAltura => {
        const valorInputAltura = $inputAltura.val()
        expect(valorInputAltura).eq('0')
      }).then(() => {
        cy.get('@inputAltura').clear().type('170', { delay: 0 }).then($inputLargura => {
          const valorInputAltura = $inputLargura.val()
          expect(valorInputAltura).eq('170')
        })
      });
    });

    it('Envio form com Largura <8cm ou >150cm', () => {
      cy.get('@inputLargura').type('6', { delay: 0 }).then($inputLargura => {
        const valorInputLargura = $inputLargura.val()
        expect(valorInputLargura).eq('6')
      }).then(() => {
        cy.get('@inputLargura').clear().type('170', { delay: 0 }).then($inputLargura => {
          const valorInputLargura = $inputLargura.val()
          expect(valorInputLargura).eq('170')
        })
      });
    });

    it('Envio form com comprimento <13cm ou >150cm', () => {
      cy.get('@inputComprimento').type('6', { delay: 0 }).then($inputLargura => {
        const valorInputComprimento = $inputLargura.val()
        expect(valorInputComprimento).eq('6')
      }).then(() => {
        cy.get('@inputComprimento').clear().type('170', { delay: 0 }).then($inputLargura => {
          const valorInputComprimento = $inputLargura.val()
          expect(valorInputComprimento).eq('170')
        })
      })
    });
  });
});




