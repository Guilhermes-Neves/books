import bookPage from "../../support/pages/bookPage";
import {book} from "../../factories/books"
import {payload} from "../../factories/bookPayload"

describe("Funcionalidade de criação de livros", () => {
    beforeEach(() => {
        cy.deleteAllBooks()
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
            cy.createNewBook(payload)
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