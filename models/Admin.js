const mongoose = require('mongoose');

// Admin Schema
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    password_hash: { type: String, required: true },
  });


module.exports = mongoose.model('Admin', adminSchema);