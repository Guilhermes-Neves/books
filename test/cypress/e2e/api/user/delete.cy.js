import { payload } from "../../../factories/user/api/payload"

describe("/usuarios DELETE", () => {
    beforeEach(() => {
        cy.dropCollection('usuarios', { database: 'test', failSilently: 'true' }).then(result => {
            cy.log(result)
        })

        cy.insertMany([payload], { collection: 'usuarios' }).then(result => {
            Cypress.env('id', result[0])
        })

    })

    it("Deve deletar um usuario com sucesso pelo seu ID", () => {
        cy.deleteUser(Cypress.env('id'))
            .then(resp => {
                expect(resp.status).to.eql(200)
            })

        cy.getAllUsers()
            .then(resp => {
                expect(resp.status).to.eql(200)
                expect(resp.body.length).to.eq(0)
            })
    })

    it("Nao deve deletar um usuario nao encontrado", () => {
        const expectedMessage = "Usuário não encontrado!"
        cy.deleteUser('66d9fce112872fe65b94b0c6')
            .then(resp => {
                expect(resp.status).to.eql(404)
                expect(resp.body.message).to.eql(expectedMessage)
            })
    })


})