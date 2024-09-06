const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { Client } = require('./models/models'); // Importando o modelo Client

// Configuração
const configFilePath = path.join(__dirname, 'config.json');
const configData = fs.readFileSync(configFilePath, 'utf8');
const config = JSON.parse(configData);

// Montando a URI de conexão ao MongoDB
const mongoUri = `mongodb+srv://${config.mongoUser}:${config.mongoPassword}@${config.mongoHost}/${config.dbName}?retryWrites=true&w=majority`;

// Conectando ao MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});

const app = express();
app.use(express.json());


// Endpoint para listar todos os clientes
app.get('/clients', async (req, res) => {
    try {
      const clients = await Client.find();
      res.json(clients);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao listar os clientes', error });
    }
  });

// Endpoint para criar um novo cliente
app.post('/clients', async (req, res) => {
  console.log(req.body)
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar o cliente', error });
  }
});

// Endpoint para atualizar um cliente existente
app.put('/clients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedClient = await Client.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedClient) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar o cliente', error });
  }
});

// Endpoint para deletar um cliente
app.delete('/clients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao deletar o cliente', error });
  }
});


// Iniciando o servidor
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
