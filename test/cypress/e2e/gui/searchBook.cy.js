import bookPage from "../../support/pages/bookPage";
import {payload} from "../../factories/book/api/bookPayload"


describe("Funcionalidade pesquisa de livros", () => {
    beforeEach(() => {
        cy.dropCollection('livros', { database: 'test', failSilently: 'true' }).then(result => {
            cy.log(result); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
        });
        cy.insertMany([payload], { collection: 'livros' })
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