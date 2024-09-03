// models/livro.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definição do schema do livro
const livroSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  editora: {
    type: String,
    required: true
  },
  anoPublicacao: {
    type: Number,
    required: true
  },
  numeroPaginas: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Lido', 'Lendo', 'Não iniciado'], // Valores permitidos para o campo status
    default: 'Não iniciado' // Valor padrão
}
});

livroSchema.index({ titulo: 1, autor: 1, editora: 1, anoPublicacao: 1, numPaginas: 1 }, { unique: true });

// Criação do modelo do livro
const Livro = mongoose.model('Livro', livroSchema);

module.exports = Livro;
