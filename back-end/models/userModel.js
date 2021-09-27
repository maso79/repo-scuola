const mongoose = require("mongoose");

const schemaUser = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    cognome: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", schemaUser, "utenti");
module.exports = User;
