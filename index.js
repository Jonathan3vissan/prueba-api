// index.mjs
import express from 'express';
import dotenv from 'dotenv';
import usuariosRoutes from './rutas/rutasUsuario.js';

// Cargar las variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();
app.use(express.json()); // Para poder recibir JSON en las peticiones

// Usar las rutas de usuarios
app.use('/api/usuarios', usuariosRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
