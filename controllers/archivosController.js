// Subida de archivos.
const multer = require("multer");
const shortid = require("shortid");
const fs = require("fs");
const Enlaces = require("../models/Enlace");

const subirArchivo = async (req, res, next) => {
  const configuracionMulter = {
    limits: { fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
    storage: (fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "/../uploads");
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf("."),
          file.originalname.length
        );
        cb(null, `${shortid.generate()}${extension}`);
      },
    })),
  };

  const upload = multer(configuracionMulter).single("archivo");

  upload(req, res, async (error) => {
    console.log(req.file);

    if (!error) {
      res.status(200).json({ archivo: req.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });
};

const eliminarArchivo = async (req, res, next) => {
  console.log(req.archivo);

  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);
    console.log("El archivo se elimino correctamente.");
  } catch (error) {
    console.log(error);
  }
};

// Descarga un archivo.
const descargar = async (req, res, next) => {
  // Obtiene el enlace.
  const { archivo } = req.params;
  const enlace = await Enlaces.findOne({ nombre: archivo });

  const archivoDescarga = __dirname + "/../uploads/" + archivo;
  res.download(archivoDescarga);

  // Eliminar el archivo y la entrada de la BD.
  // Si las descargas son iguales a 1 - Borrar la entrada y borrar el archivo.
  const { descargas, nombre } = enlace;

  if (descargas === 1) {
    // Eliminar archivo.
    req.archivo = nombre;

    // Eliminar entrada de la DB.
    await Enlaces.findOneAndRemove(enlace.id);

    next();
  } else {
    // Si las entradas es mayor a 1 - Restar 1.
    enlace.descargas--;
    await enlace.save();
  }
};

module.exports = { subirArchivo, eliminarArchivo, descargar };
