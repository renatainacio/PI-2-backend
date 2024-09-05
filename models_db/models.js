const mongoose = require('mongoose');


// Client Schema
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
});



// Exportando os modelos
const Client = mongoose.model('Client', clientSchema);



module.exports = {
  Client,
};
