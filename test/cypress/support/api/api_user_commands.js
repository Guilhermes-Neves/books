Cypress.Commands.add('createUser', (payload) => {
    cy.api({
        method: 'POST',
        url: Cypress.env('apiBaseUrl') + '/usuarios',
        body: payload,
        failOnStatusCode: false
    }).then(resp => {
        return resp
    })
})

Cypress.Commands.add('getUser', (id) => {
    cy.api({
        method: 'GET',
        url: Cypress.env('apiBaseUrl') + '/usuarios' + `/${id}`,
        failOnStatusCode: false
    }).then(resp => {
        return resp
    })
})

Cypress.Commands.add('deleteUser', (id) => {
    cy.api({
        method: 'DELETE',
        url: Cypress.env('apiBaseUrl') + '/usuarios' + `/${id}`,
        failOnStatusCode: false
    }).then(resp => {
        return resp
    })
})

Cypress.Commands.add('getAllUsers', () => {
    cy.api({
        method: 'GET',
        url: Cypress.env('apiBaseUrl') + '/usuarios',
        failOnStatusCode: false
    }).then(resp => {
        return resp
    })
})

Cypress.Commands.add('editUser', (id, payload) => {
    cy.api({
        method: 'PUT',
        url: Cypress.env('apiBaseUrl') + '/usuarios' + `/${id}`,
        failOnStatusCode: false,
        body: payload
    }).then(resp => {
        return resp
    })
})