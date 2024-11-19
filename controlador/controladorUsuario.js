// controllers/usuariosController.js
import db from '../configuracion/DB.js';

// Obtener todos los usuarios
export const getUsuarios = (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).send('Error al obtener usuarios');
    }
    res.json(results);
  });
};

// Crear un nuevo usuario
export const createUsuario = (req, res) => {
  const { nombre, email } = req.body;
  const query = 'INSERT INTO usuarios (nombre, email) VALUES (?, ?)';

  db.query(query, [nombre, email], (err, results) => {
    if (err) {
      console.error('Error al crear usuario:', err);
      return res.status(500).send('Error al crear usuario');
    }
    res.status(201).send({ id: results.insertId, nombre, email });
  });
};

// Actualizar un usuario
export const updateUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  const query = 'UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?';

  db.query(query, [nombre, email, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      return res.status(500).send('Error al actualizar usuario');
    }
    res.send('Usuario actualizado');
  });
};

// Eliminar un usuario
export const deleteUsuario = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuarios WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al eliminar usuario:', err);
      return res.status(500).send('Error al eliminar usuario');
    }
    res.send('Usuario eliminado');
  });
};
