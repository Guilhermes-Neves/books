Cypress.Commands.add('createNewBook', (payload) => {
    cy.api({
        method: 'POST',
        url: Cypress.env('apiBaseUrl'),
        body: payload,
        failOnStatusCode: false
    }).then(resp => {
        return resp
    })
})

Cypress.Commands.add('getBook', (id) => {
    cy.api({
        method: 'GET',
        url: Cypress.env('apiBaseUrl') + `/${id}`,
        failOnStatusCode: false
    }).then(resp => {
        return resp
    })
})

Cypress.Commands.add('deleteBook', (id) => {
    cy.api({
        method: 'DELETE',
        url: Cypress.env('apiBaseUrl') + `/${id}`,
        failOnStatusCode: false
    }).then(resp => {
        return resp
    })
})

Cypress.Commands.add('getAllBooks', () => {
    cy.api({
        method: 'GET',
        url: Cypress.env('apiBaseUrl'),
        failOnStatusCode: false
    }).then(resp => {
        return resp
    })
})

Cypress.Commands.add('getAllBooksByFilter', (field, value) => {
    cy.api({
        method: 'GET',
        url: Cypress.env('apiBaseUrl') + `/search?${field}=${encodeURIComponent(value)}`,
        failOnStatusCode: false
    }).then(resp => {
        return resp
    })
})

Cypress.Commands.add('editBook', (id, payload) => {
    cy.api({
        method: 'PUT',
        url: Cypress.env('apiBaseUrl') + `/${id}`,
        failOnStatusCode: false,
        body: payload
    }).then(resp => {
        return resp
    })
})