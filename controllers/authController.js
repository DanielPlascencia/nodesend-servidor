const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config({ path: "variables.env" });

const autenticarUsuario = async (req, res, next) => {
  // Revisar si hay errores.
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Buscar el usuario para ver si esta registrado.
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    res.status(401).json({ msg: "El Usuario No Existe." });
    return next();
  }

  // Verificar el password y autenticar usuario.
  if (bcrypt.compareSync(password, usuario.password)) {
    // Crear JWT.
    const token = jwt.sign(
      {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
      process.env.SECRETA,
      {
        expiresIn: "8h",
      }
    );
    res.status(200).json({ token });
  } else {
    res.status(401).json({ msg: "Password Incorrecto." });
  }
};

const usuarioAutenticado = async (req, res, next) => {
  res.status(200).json({ usuario: req.usuario });
};

module.exports = {
  autenticarUsuario,
  usuarioAutenticado,
};
