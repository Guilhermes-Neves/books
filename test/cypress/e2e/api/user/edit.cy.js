import { payload, payloadToInsert, payloadToEdit } from "../../../factories/user/api/payload"

describe("/usuarios PUT", () => {
    beforeEach(() => {
        cy.dropCollection('usuarios', { database: 'test', failSilently: 'true' }).then(result => {
            cy.log(result)
        })

        cy.insertMany([payload, payloadToInsert], { collection: 'usuarios' }).then(result => {
            cy.log(result)
            Cypress.env('id', result[0])
        })

    })

    it("Deve editar um usuário com sucesso", () => {
        const expectedMessage = "Usuário atualizado com sucesso!"
        cy.editUser(Cypress.env('id'), payload)
            .then(resp => {
                expect(resp.status).to.eql(200)
                expect(resp.body.data.nome).to.eql(payload.nome)
                expect(resp.body.data.email).to.eql(payload.email)
                expect(resp.body.data.senha).to.not.be.empty
                expect(resp.body.data._id).to.eql(Cypress.env('id'))
                expect(resp.body.message).to.eql(expectedMessage)
            })
    })

    it("Nao deve editar um usuário nao encontrado", () => {
        const expectedMessage = "Usuário não encontrado!"
        cy.editUser('66d9fce112872fe65b94b0c6', payloadToEdit)
            .then(resp => {
                expect(resp.status).to.eql(404)
                expect(resp.body.message).to.eql(expectedMessage)
            })
    })

    it("Nao deve editar um usuário duplicando o cadastro", () => {
        const expectedMessage = "E-mail já cadastrado por outro usuário!"
        cy.editUser(Cypress.env('id'), payloadToInsert)
            .then(resp => {
                expect(resp.status).to.eql(409)
                expect(resp.body.message).to.eql(expectedMessage)
            })
    })
})