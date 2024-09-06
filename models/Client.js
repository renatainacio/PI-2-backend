const mongoose = require('mongoose');

// Client Schema
const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      match: /.+\@.+\..+/ // Validação simples de email
    },
    phone: { type: String, required: true },
  });


module.exports = mongoose.model('Client', clientSchema);
