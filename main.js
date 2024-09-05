const express = require('express');
const mongoose = require('mongoose');
const { Client } = require('./models_db/models');
const fs = require('fs');
const path = require('path');

// Carregar configuração
const configFilePath = path.join(__dirname, 'config.json');
const configData = fs.readFileSync(configFilePath, 'utf8');
const config = JSON.parse(configData);

const app = express();
const port = 3000;

// Middleware para parsear o corpo das requisições
app.use(express.json());

// URL de conexão com o MongoDB
const dbUrl = `mongodb+srv://${config.mongoUser}:${config.mongoPassword}@${config.mongoHost}/${config.dbName}?retryWrites=true&w=majority`;

// Conexão com o MongoDB
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Rota GET para buscar todos os clientes
app.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota POST para adicionar um novo cliente
app.post('/clients', async (req, res) => {
    const client = new Client({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    });

    try {
        const newClient = await client.save();
        res.status(201).json(newClient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
