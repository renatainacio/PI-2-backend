const express = require('express');
const mongoose = require('mongoose');
const { Client, Pet, Appointment, TimeSlot, Adm } = require('./models'); // Importe os modelos

const app = express();
app.use(express.json()); // Para permitir o envio de JSON no corpo das requisições

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://mongo_user_1:KMAYJQkgoMMgYWaJ@mongonode-0.an8z1gw.mongodb.net/Stars', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Banco de dados conectado com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Endpoints para Clientes (Clients)
app.get('/', (req, res) => {
  res.send('<h2>Um teste ai ...</h2>')
})
// Criar um novo cliente
app.post('/clients', async (req, res) => {
  console.log('Posted');
  onsole.log(req.body);
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

// Endpoints para Pets

// Criar um novo pet
app.post('/pets', async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    const result = await newPet.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os pets
app.get('/pets', async (req, res) => {
  try {
    const pets = await Pet.find().populate('client_id'); // Populando client_id com os dados do cliente
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um pet
app.put('/pets/:id', async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPet) return res.status(404).json({ error: 'Pet não encontrado' });
    res.json(updatedPet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar um pet
app.delete('/pets/:id', async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletedPet) return res.status(404).json({ error: 'Pet não encontrado' });
    res.json({ message: 'Pet deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoints para Agendamentos (Appointments)

// Criar um novo agendamento
app.post('/appointments', async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    const result = await newAppointment.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os agendamentos
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('client_id')  // Populando client_id com os dados do cliente
      .populate('pet_id');     // Populando pet_id com os dados do pet
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um agendamento
app.put('/appointments/:id', async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAppointment) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar um agendamento
app.delete('/appointments/:id', async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json({ message: 'Agendamento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoints para Slots de Tempo (Time Slots)

// Criar um novo slot de tempo
app.post('/time-slots', async (req, res) => {
  try {
    const newTimeSlot = new TimeSlot(req.body);
    const result = await newTimeSlot.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os slots de tempo
app.get('/time-slots', async (req, res) => {
  try {
    const timeSlots = await TimeSlot.find().populate('appointment_id'); // Populando appointment_id com os dados do agendamento
    res.json(timeSlots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um slot de tempo
app.put('/time-slots/:id', async (req, res) => {
  try {
    const updatedTimeSlot = await TimeSlot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTimeSlot) return res.status(404).json({ error: 'Slot de tempo não encontrado' });
    res.json(updatedTimeSlot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar um slot de tempo
app.delete('/time-slots/:id', async (req, res) => {
  try {
    const deletedTimeSlot = await TimeSlot.findByIdAndDelete(req.params.id);
    if (!deletedTimeSlot) return res.status(404).json({ error: 'Slot de tempo não encontrado' });
    res.json({ message: 'Slot de tempo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Endpoints para Administradores (Adms)
// Criar um novo administrador
app.post('/adms', async (req, res) => {
  try {
    const newAdm = new Adm(req.body);
    const result = await newAdm.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os administradores
app.get('/adms', async (req, res) => {
  try {
    const adms = await Adm.find();
    res.json(adms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um administrador
app.put('/adms/:id', async (req, res) => {
  try {
    const updatedAdm = await Adm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAdm) return res.status(404).json({ error: 'Administrador não encontrado' });
    res.json(updatedAdm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar um administrador
app.delete('/adms/:id', async (req, res) => {
  try {
    const deletedAdm = await Adm.findByIdAndDelete(req.params.id);
    if (!deletedAdm) return res.status(404).json({ error: 'Administrador não encontrado' });
    res.json({ message: 'Administrador deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciando o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
