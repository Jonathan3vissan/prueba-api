// routes/usuariosRoutes.js
import { Router } from 'express';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../controlador/controladorUsuario.js'

const router = Router();

// Rutas de la API para usuarios
router.get('/', getUsuarios);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;
