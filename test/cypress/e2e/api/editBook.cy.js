import { payload, bookToInsert, booksToInsert } from "../../factories/bookPayload"

describe("/livros PUT", () => {
    beforeEach(() => {
        cy.dropCollection('livros', { database: 'test', failSilently: 'true' }).then(result => {
            cy.log(result)
        })

        cy.insertMany([payload, booksToInsert[0]], { collection: 'livros' }).then(result => {
            cy.log(result)
            Cypress.env('id', result[0])
        })

    })

    it("Deve editar um livro com sucesso", () => {
        const expectedMessage = "Livro atualizado com sucesso!"
        cy.editBook(Cypress.env('id'), bookToInsert)
            .then(resp => {
                expect(resp.status).to.eql(200)
                expect(resp.body.livro.titulo).to.eql(bookToInsert.titulo)
                expect(resp.body.livro.autor).to.eql(bookToInsert.autor)
                expect(resp.body.livro.editora).to.eql(bookToInsert.editora)
                expect(resp.body.livro.anoPublicacao).to.eql(bookToInsert.anoPublicacao)
                expect(resp.body.livro.numeroPaginas).to.eql(bookToInsert.numeroPaginas)
                expect(resp.body.livro.status).to.eql(bookToInsert.status)
                expect(resp.body.livro._id).to.eql(Cypress.env("id"))
                expect(resp.body.message).to.eql(expectedMessage)
            })
    })

    it("Nao deve editar um livro nao encontrado", () => {
        const expectedMessage = "Livro não encontrado."
        cy.editBook('66d9fce112872fe65b94b0c6', booksToInsert[1])
            .then(resp => {
                expect(resp.status).to.eql(404)
                expect(resp.body.message).to.eql(expectedMessage)
            })
    })

    it("Nao deve editar um livro duplicando o cadastro", () => {
        const expectedMessage = "Existe um livro cadastrado com essas informações."
        cy.editBook(Cypress.env('id'), booksToInsert[0])
            .then(resp => {
                expect(resp.status).to.eql(409)
                expect(resp.body.message).to.eql(expectedMessage)
            })
    })


})