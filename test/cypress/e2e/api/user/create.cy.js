import { payload } from "../../../factories/user/api/payload"

describe("/usuarios POST", () => {
    beforeEach(() => {
        cy.dropCollection('usuarios', { database: 'test', failSilently: 'true' }).then(result => {
            cy.log(result);
        });
    })

    it("Deve criar um usuario com sucesso", () => {
        const expectedMessage = 'Usuário cadastrado com sucesso!'
        cy.createUser(payload)
            .then(resp => {
                expect(resp.status).to.eql(201)
                expect(resp.body.data.nome).to.eql(payload.nome)
                expect(resp.body.data.email).to.eql(payload.email)
                expect(resp.body.data.senha).to.not.be.empty
                expect(resp.body.data._id).to.not.be.empty
                expect(resp.body.message).to.eql(expectedMessage)
            })

    })

    it("Não deve cadastrar um usuario duplicado", () => {
        cy.createUser(payload)
        const expectedMessage = 'E-mail já cadastrado por outro usuário!'
        cy.createUser(payload)
            .then(resp => {
                expect(resp.status).to.eql(409)
                expect(resp.body.message).to.eql(expectedMessage)
            })

    })

    it("Cadastrar um usuario sem informar nenhum campo", () => {
        const expectedMessage = 'Todos os campos são obrigatórios.'
        const emptyBook = {}
        cy.createUser(emptyBook)
            .then(resp => {
                expect(resp.status).to.eql(400)
                expect(resp.body.message).to.eql(expectedMessage)
            })
    })

})