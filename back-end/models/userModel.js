const mongoose = require("mongoose");

const schemaUser = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      unique: false,
    },
    cognome: {
      type: String,
      required: true,
      unique: false,
    },
    eta: {
      type: Number,
      required: true,
      unique: false,
    },
    giorno: {
      type: Number,
      required: true,
      unique: false,
    },
    mese: {
      type: Number,
      required: true,
      unique: false,
    },
    meseStringa:{
      type: String,
      required: true,
      unique: false
    },
    anno: {
      type: Number,
      required: true,
      unique: false,
    },
    sesso:{
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
