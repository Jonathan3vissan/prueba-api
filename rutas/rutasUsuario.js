// routes/usuariosRoutes.js
import { Router } from 'express';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario,getUsuarioById } from '../controlador/controladorUsuario.js';

const router = Router();

// Rutas de la API para usuarios
router.get('/', getUsuarios); // Obtener todos los usuarios
router.post('/', createUsuario); // Crear un nuevo usuario
router.put('/:id', updateUsuario); // Actualizar un usuario por ID
router.delete('/:id', deleteUsuario); // Eliminar un usuario por ID

router.get('/:id', getUsuarioById);  // Obtener un usuario por ID

export default router;
