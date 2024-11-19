// config/db.js
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

// Configurar la conexión con la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Verificar la conexión
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL exitosa!');
});

export default connection;
