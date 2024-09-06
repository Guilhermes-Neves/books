const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

router.post('/usuarios', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Verifica se o e-mail já foi cadastrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ message: 'E-mail já cadastrado por outro usuário!' });
    }

    // Cria o novo usuário
    const novoUsuario = new Usuario({ nome, email, senha });
    await novoUsuario.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', data: novoUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário!', error });
  }
});

router.put('/usuarios/:id', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    
    const usuarioExistente = await Usuario.findOne({ email });
    
    if (usuarioExistente && usuarioExistente._id.toString() !== req.params.id) {
      return res.status(409).json({ message: 'E-mail já cadastrado por outro usuário!' });
    }

    // Atualiza o usuário
    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nome, email, senha },
      { new: true, runValidators: true }
    );
    
    if (!usuarioAtualizado) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    res.status(200).json({ message: 'Usuário atualizado com sucesso!', data: usuarioAtualizado });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário!', error });
  }
});

router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar livros.', error });
  }
});

router.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário!', error });
  }
});

router.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuarioDeletado = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuarioDeletado) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    res.status(200).json({ message: 'Usuário excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir usuário', error });
  }
});

module.exports = router;