const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const {
  subirArchivo,
  descargar,
  eliminarArchivo,
} = require("../controllers/archivosController");

router.post("/", auth, subirArchivo);

router.get("/:archivo", descargar, eliminarArchivo);

module.exports = router;
