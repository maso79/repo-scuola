const mongoose = require("mongoose");

const schemaUser = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  cognome: {
    type: String,
    required: true,
    unique: true,
  },
});

const User=mongoose.model("User",schemaUser,"utenti")
module.exports = User