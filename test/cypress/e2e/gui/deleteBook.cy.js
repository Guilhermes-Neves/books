import bookPage from "../../support/pages/bookPage";
import {payload} from "../../factories/book/api/bookPayload"


describe("Funcionalidade exclusão de livros", () => {
    beforeEach(() => {
        cy.dropCollection('livros', { database: 'test', failSilently: 'true' }).then(result => {
            cy.log(result); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
        });
        cy.insertMany([payload], { collection: 'livros' })
        bookPage.go()
    })

    it("Excluir um livro com sucesso", () => {
        const expectedMessage = "Livro removido com sucesso!"
        bookPage.deleteBook()
        bookPage.validateToastMessage(expectedMessage)
    })
})