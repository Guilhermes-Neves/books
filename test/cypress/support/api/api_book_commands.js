Cypress.Commands.add('createNewBook', (payload) => {
    cy.api({
        method: 'POST',
        url: Cypress.env('apiBaseUrl') + '/livros',
        body: payload,
        failOnStatusCode: false
    }).then(resp => {
        return resp
    })
})

Cypress.Commands.add('getBook', (id) => {
    cy.api({
        method: 'GET',
        url: Cypress.env('apiBaseUrl') + '/livros' + `/${id}`,
        failOnStatusCode: false
    }).then(resp => {
        return resp
    })
})

Cypress.Commands.add('deleteBook', (id) => {
    cy.api({
        method: 'DELETE',
        url: Cypress.env('apiBaseUrl') + '/livros' + `/${id}`,
        failOnStatusCode: false
    }).then(resp => {
        return resp
    })
})

Cypress.Commands.add('getAllBooks', () => {
    cy.api({
        method: 'GET',
        url: Cypress.env('apiBaseUrl') + '/livros',
        failOnStatusCode: false
    }).then(resp => {
        return resp
    })
})

Cypress.Commands.add('getAllBooksByFilter', (field, value) => {
    cy.api({
        method: 'GET',
        url: Cypress.env('apiBaseUrl') + '/livros' + `/search?${field}=${encodeURIComponent(value)}`,
        failOnStatusCode: false
    }).then(resp => {
        return resp
    })
})

Cypress.Commands.add('editBook', (id, payload) => {
    cy.api({
        method: 'PUT',
        url: Cypress.env('apiBaseUrl') + '/livros' + `/${id}`,
        failOnStatusCode: false,
        body: payload
    }).then(resp => {
        return resp
    })
})