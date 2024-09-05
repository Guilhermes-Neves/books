import { bookToInsert, booksToInsert } from "../../factories/bookPayload"

describe("/livros GET", () => {
    beforeEach(() => {
        cy.dropCollection('livros', { database: 'test', failSilently: 'true' }).then(result => {
            cy.log(result)
        })

        cy.insertOne({ bookToInsert }, { collection: 'livros', database: 'test' }).then(result => {
            cy.log(result)
            Cypress.env('id', result)
        });

    })

    it("Deve obter um livro com sucesso pelo seu ID", () => {
        cy.getBook(Cypress.env('id'))
            .then(resp => {
                expect(resp.status).to.eql(200)
                expect(resp.body.bookToInsert.titulo).to.eql(bookToInsert.titulo)
                expect(resp.body.bookToInsert.autor).to.eql(bookToInsert.autor)
                expect(resp.body.bookToInsert.editora).to.eql(bookToInsert.editora)
                expect(resp.body.bookToInsert.anoPublicacao).to.eql(bookToInsert.anoPublicacao)
                expect(resp.body.bookToInsert.numeroPaginas).to.eql(bookToInsert.numeroPaginas)
                expect(resp.body.bookToInsert.status).to.eql(bookToInsert.status)
                expect(resp.body._id).to.eql(Cypress.env('id'))
            })
    })

    it("Nào deve obter um livro", () => {
        const expectedMessage = "Livro não encontrado."
        cy.getBook('66d9fce112872fe65b94b0c6')
            .then(resp => {
                expect(resp.status).to.eql(404)
                expect(resp.body.message).to.eql(expectedMessage)
            })
    })

    context("Deve ter livros cadastrados", () => {
        beforeEach(() => {
            cy.dropCollection('livros', { database: 'test', failSilently: 'true' })
            cy.insertMany([booksToInsert[0], booksToInsert[1], booksToInsert[2]], { collection: 'livros' })
        })

        it("Deve buscar todos os livros cadastrados", () => {
            cy.getAllBooks()
                .then((response) => {
                    expect(response.status).to.eq(200);
                    const booksReturned = response.body;

                    expect(booksReturned).to.have.lengthOf(booksToInsert.length);

                    booksToInsert.forEach((book, index) => {
                        console.log(booksReturned[index])
                        console.log(book)
                        expect(booksReturned[index]).to.include(book);
                    })
                })
        })

        const filters = ["titulo", "autor", "status"]

        filters.forEach(f => {
            it(`Deve aplicar o filtro por ${f} informado na consulta`, () => {
                booksToInsert.forEach((book, index) => {
                    cy.getAllBooksByFilter(f, book[f])
                        .then(resp => {
                            expect(resp.status).to.eq(200);
                            expect(resp.body).to.have.lengthOf(1);
                            expect(resp.body[0].titulo).to.eql(booksToInsert[index].titulo)
                            expect(resp.body[0].autor).to.eql(booksToInsert[index].autor)
                            expect(resp.body[0].editora).to.eql(booksToInsert[index].editora)
                            expect(resp.body[0].anoPublicacao).to.eql(booksToInsert[index].anoPublicacao)
                            expect(resp.body[0].numeroPaginas).to.eql(booksToInsert[index].numeroPaginas)
                            expect(resp.body[0].status).to.eql(booksToInsert[index].status)
                        })
    
                })
            })
        })

    })
})