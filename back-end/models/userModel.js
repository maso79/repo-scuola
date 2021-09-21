const mongoose = require("mongoose");

const User = mongoose.Schema({
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

module.exports = mongoose.model("User", User);
