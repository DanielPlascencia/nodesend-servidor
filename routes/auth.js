const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth.middleware");

const {
  usuarioAutenticado,
  autenticarUsuario,
} = require("../controllers/authController");

router.post(
  "/",
  [
    check("email", "Agrega un Email valido").isEmail(),
    check("password", "El password no puede ir vacio").not().isEmpty(),
  ],
  autenticarUsuario
);

router.get("/", auth, usuarioAutenticado);

module.exports = router;
