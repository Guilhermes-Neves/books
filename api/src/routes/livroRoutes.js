// routes/livroRoutes.js
const express = require('express');
const router = express.Router();
const Livro = require('../models/livro');

// Endpoint para buscar livros com filtros combinados por título, autor ou status
router.get('/livros/search', async (req, res) => {
  try {
      const { titulo, autor, status } = req.query;

      // Cria um objeto de filtro dinâmico
      const filtros = {};

      if (titulo) {
          filtros.titulo = { $regex: titulo, $options: 'i' }; // Filtro por título (insensível a maiúsculas/minúsculas)
      }
      if (autor) {
          filtros.autor = { $regex: autor, $options: 'i' }; // Filtro por autor (insensível a maiúsculas/minúsculas)
      }
      if (status) {
          filtros.status = status; // Filtro por status
      }

      // Busca livros no banco de dados com os filtros aplicados
      const livros = await Livro.find(filtros);

      res.json(livros);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Cadastro de livros
router.post('/livros', async (req, res) => {
  try {
    const { titulo, autor, editora, anoPublicacao, numeroPaginas, status } = req.body;

    // Verifica se todos os campos foram informados
    if (!titulo || !autor || !editora || !anoPublicacao || !numeroPaginas || !status) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Tenta Cria um novo livro
    const novoLivro = new Livro({
      titulo,
      autor,
      editora,
      anoPublicacao,
      numeroPaginas,
      status,
    });

    await novoLivro.save();
    res.status(201).json({message: 'Livro cadastrado com sucesso!', livro: novoLivro});
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Existe um livro cadastrado com essas informações.' });
    } else {
      res.status(500).json({ message: 'Erro ao cadastrar o livro.' });
    }
  }
});

// Endpoint para editar um livro por ID
router.put('/livros/:id', async (req, res) => {
  try {
      const { titulo, autor, editora, anoPublicacao, numeroPaginas, status } = req.body;

      // Encontra o livro pelo ID e atualiza os campos
      const livroAtualizado = await Livro.findByIdAndUpdate(
          req.params.id, 
          { titulo, autor, editora, anoPublicacao, numeroPaginas, status }, 
          { new: true, runValidators: true }
      );

      if (!livroAtualizado) {
          return res.status(404).json({ message: 'Livro não encontrado' });
      }

      res.json({message: 'Livro atualizado com sucesso!', livro: livroAtualizado});
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

// Listagem de livros
router.get('/livros', async (req, res) => {
  try {
    const livros = await Livro.find();
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar livros.', error });
  }
});

// Consulta de livro por ID
router.get('/livros/:id', async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado.' });
    }
    res.status(200).json(livro);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao consultar livro.', error });
  }
});



// Remoção de livro
router.delete('/livros/:id', async (req, res) => {
  try {
    const livro = await Livro.findByIdAndDelete(req.params.id);
    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado.' });
    }
    res.status(200).json({ message: 'Livro removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover livro.', error });
  }
});

module.exports = router;
