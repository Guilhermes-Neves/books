const payload = {
    "titulo": "Criado via API",
    "autor": "Guilherme",
    "editora": "Editora 1",
    "anoPublicacao": 2010,
    "numeroPaginas": 510,
    "status": "Lido"
}

const bookToInsert = {
    "titulo": "Criado via API",
    "autor": "Guilherme",
    "editora": "Editora 1",
    "anoPublicacao": 2010,
    "numeroPaginas": 510,
    "status": "Lido",
}

const booksToInsert = [
    {
      "titulo": "O Senhor dos Anéis: A Sociedade do Anel",
      "autor": "J.R.R. Tolkien",
      "editora": "HarperCollins",
      "anoPublicacao": 1954,
      "numeroPaginas": 423,
      "status": "Lido"
    },
    {
      "titulo": "1984",
      "autor": "George Orwell",
      "editora": "Companhia das Letras",
      "anoPublicacao": 1949,
      "numeroPaginas": 328,
      "status": "Não iniciado"
    },
    {
      "titulo": "Dom Quixote",
      "autor": "Miguel de Cervantes",
      "editora": "Penguin",
      "anoPublicacao": 1605,
      "numeroPaginas": 992,
      "status": "Lendo"
    }
  ]
  

export default { payload , bookToInsert, booksToInsert}