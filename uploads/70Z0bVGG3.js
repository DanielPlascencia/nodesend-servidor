const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

// Crear el servidor.
const app = express();

// Conectar a la DB.
conectarDB();

// Habilitar Cors.
const opcionesCors = {
  origin: process.env.FRONTEND_URL,
};
app.use(cors(opcionesCors));

// Puerto de la app.
const PORT = process.env.PORT || 4000;

// Habilitar leer los valores de un body.
app.use(express.json());

// Rutas de la app.
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/enlaces", require("./routes/enlaces"));
app.use("/api/archivos", require("./routes/archivos"));

// Arrancar la app.
app.listen(PORT, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando n el puerto ${PORT}`);
});
