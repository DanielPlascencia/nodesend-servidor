const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
  email: {
    type: "string",
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  nombre: {
    type: "string",
    required: true,
    trim: true,
  },
  password: {
    type: "string",
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Usuarios", usuariosSchema);
