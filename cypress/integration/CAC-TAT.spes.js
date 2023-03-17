/// <reference types="Cypress" />

//descrição da switch de teste
describe('Central de Atendimento ao Cliente TAT', function () {
    this.beforeEach(function () {
        cy.visit(Cypress.config('baseUrl'))
    })
    //it=test case title dele
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Teste, lascado grande pra caramba só para ver o que vai rolar aqui neste teste acreditem é sómente um teste sem virgulas nem nada'

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').type('Will')
        cy.get('#lastName').type('Pereira')
        cy.get('#email').type('will@mail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })//delay 0 na escrita
        cy.get('button[type="submit"]').click()//cy.get('.button') para class

        cy.get('.success').contains('Mensagem enviada com sucesso.').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').type('Will')
        cy.get('#lastName').type('Pereira')
        cy.get('#email').type('will@.com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()//cy.get('.button') para class

        cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
    })

    it('campo de telefone continua vazio quando preenchido com valor não numerico', function () {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#phone')
            .type('digitando numero de telefone')
            .should('have.value', '')//pega o que foi digitado e compara com '' nada q é o esperado

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').type('Will')
        cy.get('#lastName').type('Pereira')
        cy.get('#email').type('will@.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()//cy.get('.button') para class

        cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
    })

    /* 
    it.only('preenche e limpa os campos de nome sobrenome email telefone e textarea', function () {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName')
            .type(Cypress.env('user_name'), { log: false })
            .should('have.value', 'Will')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Pereira')
            .should('have.value', 'Pereira')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('will@mail.com')
            .should('have.value', 'will@mail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('32236661')
            .should('have.value', '32236661')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('teste')
            .should('have.value', 'teste')
            .clear()
            .should('have.value', '')

        cy.get('button[type="submit"]').click()//cy.get('.button') para class

        cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
    })
*/
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        //elemento + texto do elemento
        cy.contains('button', 'Enviar').click()

        cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
    })


    //--------------------------
    it('envia formulario com sucesso usando um comando customizado 2.9', function () {
        cy.fillMandatoryFieldsAndSubmit('Will')//exec método custom dentro de suport q importa de dentro do > /commands.js

        cy.get('.success').contains('Mensagem enviada com sucesso.').should('be.visible')
    })

    it('seleciona um produto (youtube) por seu texto', function () {

        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube') //porque ta identificando o valor e não o texto por isso minusculo
    })

    it('seleciona um produto (mentoria) por seu valor', function () {

        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria') //porque ta identificando o valor e não o texto por isso minusculo
    })

    it('seleciona um produto (blog) por seu índice', function () {

        cy.get('#product')
            .select(1) //segundo valor pois começa em 0
            .should('have.value', 'blog') //porque ta identificando o valor e não o texto por isso minusculo
    })
/* 
    it('seleciona um produto random', () => {
        cy.get('select option')
            .its('length', { log: false }).then(n => {//n=valor total do select
                cy.get('select').select(Cypress._.random(n - 1))//n deixa pegar o elemento 0
            })
    })
*/
    it('marcando input tipo radio feedback', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })


    it('marcando input tipo radio cada um deles', () => {
        cy.get('input[type="radio"]')//pega todos radios
            .should('have.length', 3) //verifica o tamanho se é 3 meses
            .each(function ($radio) { //passa por cada um dos elementos 'laço'
                cy.wrap($radio).check()
                    .should('be.checked')
            }) //pega cada um deles
    })

    it('marcando ambos checkbox e depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('have.length', 2)
            .should('be.checked')
            .last()
            .uncheck()
            .should('have.length', 1)
            .should('not.be.checked')

    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')//adicionou arquivo no input
            .should(function ($input) {//should encadeia e recebe função de callback q recebe o elemento do get
                console.log($input) // inspecionar no cypress
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando drag and drop', () => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })//adicionou arquivo no input e dando drag drop
            .should(function ($input) {//should encadeia e recebe função de callback q recebe o elemento do get
                console.log($input) // inspecionar no cypress
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })


    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('exampleFile')//pega direto da pasta fixture e da um alias
        cy.get('input[type="file"]#file-upload')
            .selectFile('@exampleFile')//pega o nosso alias
            .should(function ($input) {//should encadeia e recebe função de callback q recebe o elemento do get
                console.log($input) // inspecionar no cypress
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank') //verifica q tem atributo target com valor blank
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            //invoke para retirar o atributo target não deixando ele abrir ele em nova página (necessário por causa do cypress v9)
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })
    
    it('testa a página da política de privacidade de forma independente', () => {
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/privacy.html');
        cy.contains('Talking About Testing').should('be.visible')
    })
})

