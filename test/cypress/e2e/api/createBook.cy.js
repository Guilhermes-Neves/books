import { payload } from "../../factories/bookPayload"

describe("/livros POST", () => {
    beforeEach(() => {
        cy.dropCollection('livros', { database: 'test', failSilently: 'true' }).then(result => {
            cy.log(result); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
        });
    })

    it("Deve criar um livro com sucesso", () => {
        const expectedMessage = 'Livro cadastrado com sucesso!'
        cy.createNewBook(payload)
            .then(resp => {
                expect(resp.status).to.eql(201)
                expect(resp.body.livro.titulo).to.eql(payload.titulo)
                expect(resp.body.livro.autor).to.eql(payload.autor)
                expect(resp.body.livro.editora).to.eql(payload.editora)
                expect(resp.body.livro.anoPublicacao).to.eql(payload.anoPublicacao)
                expect(resp.body.livro.numeroPaginas).to.eql(payload.numeroPaginas)
                expect(resp.body.livro.status).to.eql(payload.status)
                expect(resp.body.livro._id).to.not.be.empty
                expect(resp.body.message).to.eql(expectedMessage)
            })

    })

    it("Não deve cadastrar um livro duplicado", () => {
        cy.createNewBook(payload)
        const expectedMessage = 'Existe um livro cadastrado com essas informações.'
        cy.createNewBook(payload)
            .then(resp => {
                expect(resp.status).to.eql(409)
                expect(resp.body.message).to.eql(expectedMessage)
            })

    })

    it("Cadastrar um livro sem informar nenhum campo", () => {
        const expectedMessage = 'Todos os campos são obrigatórios.'
        const emptyBook = {}
        cy.createNewBook(emptyBook)
            .then(resp => {
                expect(resp.status).to.eql(400)
                expect(resp.body.message).to.eql(expectedMessage)
            })
    })

})