import bookPage from "../../support/pages/bookPage";
import {book} from "../../factories/books"
import {payload} from "../../factories/bookPayload"

describe("Funcionalidade de criação de livros", () => {
    beforeEach(() => {
        cy.dropCollection('livros', { database: 'test', failSilently: 'true' }).then(result => {
            cy.log(result); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
        })
        bookPage.go()
    })

    it("Cadastrar um livro com sucesso", () => {
        const expectedMessage = "Livro cadastrado com sucesso!"
        bookPage.openCreateModal()
        bookPage.fillForm(book)
        bookPage.submit()
        bookPage.validateToastMessage(expectedMessage)
    })

    it("Cadastrar um livro sem informar nenhum campo", () => {
        const expectedMessage = "Todos os campos são obrigatórios."
        bookPage.openCreateModal()
        bookPage.submit()
        bookPage.validateToastMessage(expectedMessage)
    })

    context("Com um livro criado, tentar cadastrar o mesmo novamente", () => {
        beforeEach(() => {
            cy.insertMany([payload], { collection: 'livros' })
            cy.reload()
        })
        
        it("Cadastrar um livro duplicado", () => {
            const expectedMessage = "Existe um livro cadastrado com essas informações."
            bookPage.openCreateModal()
            bookPage.fillForm(payload)
            bookPage.submit()
            bookPage.validateToastMessage(expectedMessage)
        })
    })
})