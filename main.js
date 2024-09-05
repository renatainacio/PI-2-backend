const express = require('express');
const mongoose = require('mongoose');
const { Client, Pet, Appointment, TimeSlot, Adm } = require('./models_db/models'); // Importe os modelos

const app = express();
app.use(express.json()); // Para permitir o envio de JSON no corpo das requisições

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://mongo_user_1:KMAYJQkgoMMgYWaJ@mongonode-0.an8z1gw.mongodb.net/Stars')
  .then(() => console.log('Banco de dados conectado com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Endpoints para Clientes (Clients)
app.get('/', (req, res) => {
  res.send('<h2>Um teste ai ...</h2>')
})

// Criar um novo cliente
app.post('/clients', async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const result = await newClient.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os clientes
app.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um cliente
app.put('/clients/:id', async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClient) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar um cliente
app.delete('/clients/:id', async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Iniciando o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
