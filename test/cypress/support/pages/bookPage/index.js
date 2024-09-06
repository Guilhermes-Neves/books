import { el } from './elements'

class BookPage {
    go() {
        cy.visit('/')
    }

    openCreateModal() {
        cy.get(el.btnNewBook).click()
    }

    openEditModal(book) {
        cy.contains('table tbody tr td', book.titulo)    
            .parent()                            
            .find('button[name="editBook"]')     
            .click();
    }

    fillForm(book) {
        cy.get(el.bookTitulo)
            .clear()
            .type(book.titulo)
        cy.get(el.bookAutor)
            .clear()
            .type(book.autor)
        cy.get(el.bookEditora)
            .clear()
            .type(book.editora)
        cy.get(el.bookAnoPublicacao)
            .clear()
            .type(book.anoPublicacao)
        cy.get(el.bookNumPag)
            .clear()
            .type(book.numeroPaginas)
        cy.get(el.bookStatus).click()
        cy.contains(el.div, book.status).click()
    }

    submit() {
        cy.get(el.btnSubmitForm).click()
    }

    deleteBook() {
        cy.get(el.btnDelete).click()
        cy.get(el.btnConfirmDelete).click()
    }

    validateToastMessage(message) {
        cy.get(el.toastMessage).should("contains.text", message)
    }

    fillInputFilter(fieldToSelect, value) {
        const fields = {
            'titulo': () => cy.get(el.inputSearchTitulo).type(value),
            'autor': () => cy.get(el.inputSearchAutor).type(value),
            'status': () => {
                cy.get(el.inputSearchStatus).click()
                cy.contains(el.div, value).click()

            }
        }
        const destinationAction = fields[fieldToSelect]
        if (destinationAction) destinationAction()
    }

    applyFilter() {
        cy.get(el.btnSearchFilter).click()
    }

    clearFilter() {
        cy.get(el.btnClearFilters).click()
    }

    validateResultInTable(value) {
        cy.get(el.resultTable).should("contains.text", value)
    }
}

export default new BookPage()