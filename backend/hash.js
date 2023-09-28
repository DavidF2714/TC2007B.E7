const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

// URL de conexión a la base de datos
const mongoURL = "mongodb://localhost:27017/tc2007b";

// Datos del usuario que deseas agregar
const usuario = "Ian123@hotmail.com";
const password = "prueba2";
const fullName = "Ian Luis";

// Número de rondas de salto para bcrypt
const saltRounds = 10;

// Función asincrónica para conectar a la base de datos
async function connectDB() {
  try {
    const client = new MongoClient(mongoURL, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("tc2007b"); // Reemplaza "tc2007b" con el nombre de tu base de datos
    console.log("Conectado a la base de datos");
    return db;
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    throw error;
  }
}

// Función principal asincrónica
async function main() {
  try {
    const db = await connectDB();

    // Generar el hash de la contraseña
    bcrypt.genSalt(saltRounds, async (error, salt) => {
      if (error) {
        console.error("Error al generar el hash de contraseña:", error);
        return;
      }
      bcrypt.hash(password, salt, async (error, hash) => {
        if (error) {
          console.error("Error al generar el hash de contraseña:", error);
          return;
        }
        // Insertar el usuario en la base de datos
        const result = await db.collection("usuarios").insertOne({
          usuario: usuario,
          password: hash,
          fullName: fullName
        });
        console.log("Usuario agregado con éxito.");
      });
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
