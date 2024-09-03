import bookPage from "../../support/pages/bookPage";
import {payload} from "../../factories/bookPayload"


describe("Funcionalidade pesquisa de livros", () => {
    beforeEach(() => {
        cy.deleteAllBooks()
        cy.createNewBook(payload)
        bookPage.go()
    })

    it("Pesquisar livros com todas as opções", () => {
        const fields = [
            {field: 'titulo', value: payload.titulo},
            {field: 'autor', value: payload.autor},
            {field: 'status', value: payload.status}
        ]

        fields.forEach((f) => {
            bookPage.fillInputFilter(f.field, f.value)
            bookPage.applyFilter()
            bookPage.validateResultInTable(f.value)
            bookPage.clearFilter()
        })

    })
})