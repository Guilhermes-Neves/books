import bookPage from "../../support/pages/bookPage";
import {payload} from "../../factories/bookPayload"


describe("Funcionalidade exclusão de livros", () => {
    beforeEach(() => {
        cy.deleteAllBooks()
        cy.createNewBook(payload)
        bookPage.go()
    })

    it("Excluir um livro com sucesso", () => {
        const expectedMessage = "Livro removido com sucesso!"
        bookPage.deleteBook()
        bookPage.validateToastMessage(expectedMessage)
    })
})