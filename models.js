const mongoose = require('mongoose');


// Client Schema
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
});


// Pet Schema
const petSchema = new mongoose.Schema({
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
});


// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  pet_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  reason: { type: String, enum: ['Checkup', 'Vaccination', 'Surgery'], required: true },
  appointment_date: { type: Date, required: true },
  appointment_time: { type: String, required: true },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], required: true },
  notes: { type: String },
});


// Time Slot Schema
const timeSlotSchema = new mongoose.Schema({
  slot_date: { type: Date, required: true },
  slot_time: { type: String, required: true },
  is_avaiable: { type: Boolean, default: true },
  appointment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
});


// Admin Schema
const admSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  password_hash: { type: String, required: true },
});


// Exportando os modelos
const Client = mongoose.model('Client', clientSchema);
const Pet = mongoose.model('Pet', petSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);
const Adm = mongoose.model('Adm', admSchema);


module.exports = {
  Client,
  Pet,
  Appointment,
  TimeSlot,
  Adm,
};
