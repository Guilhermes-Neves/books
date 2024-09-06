import bookPage from "../../support/pages/bookPage";
import {payload, bookToInsert, booksToInsert} from "../../factories/book/api/bookPayload"


describe("Funcionalidade edicao de livros", () => {
    beforeEach(() => {
        cy.dropCollection('livros', { database: 'test', failSilently: 'true' }).then(result => {
            cy.log(result);
        });
        cy.insertMany([payload, booksToInsert[0]], { collection: 'livros' })
        bookPage.go()
    })

    it("Editar um livro com sucesso", () => {
        const expectedMessage = "Livro atualizado com sucesso!"
        bookPage.openEditModal(bookToInsert)
        bookPage.fillForm(bookToInsert)
        bookPage.submit()
        bookPage.validateToastMessage(expectedMessage)
    })

    it("Não deve editar um livro duplicando o cadastro", () => {
        const expectedMessage = "Existe um livro cadastrado com essas informações."
        bookPage.openEditModal(booksToInsert[0])
        bookPage.fillForm(bookToInsert)
        bookPage.submit()
        bookPage.validateToastMessage(expectedMessage)
    })
})