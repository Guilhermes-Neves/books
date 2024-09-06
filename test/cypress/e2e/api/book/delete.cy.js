import { payload } from "../../../factories/book/api/bookPayload"

describe("/livros DELETE", () => {
    beforeEach(() => {
        cy.dropCollection('livros', { database: 'test', failSilently: 'true' }).then(result => {
            cy.log(result)
        })

        cy.insertMany([payload], { collection: 'livros' }).then(result => {
            Cypress.env('id', result[0])
        })

    })

    it("Deve deletar um livro com sucesso pelo seu ID", () => {
        cy.deleteBook(Cypress.env('id'))
            .then(resp => {
                expect(resp.status).to.eql(200)
            })

        cy.getAllBooks()
            .then(resp => {
                expect(resp.status).to.eql(200)
                expect(resp.body.length).to.eq(0)
            })
    })

    it("Nao deve deletar um livro nao encontrado", () => {
        const expectedMessage = "Livro não encontrado."
        cy.deleteBook('66d9fce112872fe65b94b0c6')
            .then(resp => {
                expect(resp.status).to.eql(404)
                expect(resp.body.message).to.eql(expectedMessage)
            })
    })


})