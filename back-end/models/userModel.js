const mongoose = require("mongoose");

const schemaUser = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      unique: false
    },
    cognome: {
      type: String,
      required: true,
      unique: false
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", schemaUser, "utenti");
module.exports = User;
