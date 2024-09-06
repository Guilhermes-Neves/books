// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const livroRoutes = require('./routes/livroRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
const port = 5001;

// Configurando o CORS
app.use(cors({
    origin: 'http://localhost:8080', // Substitua pelo URL do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

// Middleware para parser de JSON
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect(config.mongoURI)
    .then(() => {
        console.log('Conectado ao MongoDB');
    }).catch(err => {
        console.error('Erro ao conectar ao MongoDB', err);
    });

// Rotas
app.use('/api', livroRoutes);
app.use('/api', usuarioRoutes);

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
