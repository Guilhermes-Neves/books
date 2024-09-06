import { payload, payloadToInsert, payloadToEdit } from "../../../factories/user/api/payload"

describe("/usuarios GET", () => {
    beforeEach(() => {
        cy.dropCollection('usuarios', { database: 'test', failSilently: 'true' }).then(result => {
            cy.log(result)
        })

        cy.insertOne({ payload }, { collection: 'usuarios', database: 'test' }).then(result => {
            cy.log(result)
            Cypress.env('id', result)
        });

    })

    it("Deve obter um usuário com sucesso pelo seu ID", () => {
        cy.getUser(Cypress.env('id'))
            .then(resp => {
                expect(resp.status).to.eql(200)
                expect(resp.body.payload.nome).to.eql(payload.nome)
                expect(resp.body.payload.email).to.eql(payload.email)
                expect(resp.body.payload.senha).to.not.be.empty
                expect(resp.body._id).to.eql(Cypress.env('id'))
            })
    })

    it("Nào deve obter um usuário", () => {
        const expectedMessage = "Usuário não encontrado!"
        cy.getUser('66d9fce112872fe65b94b0c6')
            .then(resp => {
                expect(resp.status).to.eql(404)
                expect(resp.body.message).to.eql(expectedMessage)
            })
    })

    context("Deve ter usuários cadastrados", () => {
        const usuarios = [payload, payloadToInsert, payloadToEdit]
        beforeEach(() => {
            cy.dropCollection('usuarios', { database: 'test', failSilently: 'true' })
            cy.insertMany([usuarios[0], usuarios[1], usuarios[2]], { collection: 'usuarios' })
        })

        it("Deve buscar todos os livros cadastrados", () => {
            cy.getAllUsers()
                .then((response) => {
                    expect(response.status).to.eq(200);
                    const usersReturned = response.body;

                    expect(usersReturned).to.have.lengthOf(usuarios.length);

                    usuarios.forEach((user, index) => {
                        expect(usersReturned[index]).to.include(user);
                    })
                })
        })
    })
})