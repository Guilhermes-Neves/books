Cypress.Commands.add('deleteAllBooks', () => {
    cy.request({
        method: 'GET',
        url: Cypress.env('apiBaseUrl')
    }).then(resp => {
        resp.body.forEach(element => {
            cy.request({
                method: 'DELETE',
                url: Cypress.env('apiBaseUrl') + `/${element._id}`
            })
        });
    })
})

Cypress.Commands.add('createNewBook', (payload) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('apiBaseUrl'),
        body: payload
    }).then(resp => {
        expect(resp.status).to.eq(201)
    })
})