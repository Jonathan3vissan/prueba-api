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
  const { nombre, apellido, email, telefono } = req.body;

  // Validación de los campos para asegurarse de que no falte ninguno
  if (!nombre || !apellido || !email || !telefono) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  // Verificar si el correo ya existe en la base de datos
  const checkEmailQuery = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error('Error al verificar email:', err);
      return res.status(500).send('Error al verificar el email');
    }

    // Si el email ya existe, devolver un mensaje de error
    if (results.length > 0) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    // Query para insertar el nuevo usuario
    const query = 'INSERT INTO usuarios (nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, apellido, email, telefono], (err, results) => {
      if (err) {
        console.error('Error al crear usuario:', err);
        return res.status(500).send('Error al crear usuario');
      }

      // Retornamos el ID del nuevo usuario creado
      res.status(201).send({
        id: results.insertId,
        nombre,
        apellido,
        email,
        telefono
      });
    });
  });
};

// Actualizar un usuario
export const updateUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, telefono } = req.body;

  // Validación para asegurarse de que todos los campos sean proporcionados
  if (!nombre || !apellido || !email || !telefono) {
    return res.status(400).json({ message: 'Todos los campos son requeridos para actualizar' });
  }

  // Verificar si el usuario existe antes de intentar actualizar
  const checkUserQuery = 'SELECT * FROM usuarios WHERE id = ?';
  db.query(checkUserQuery, [id], (err, results) => {
    if (err) {
      console.error('Error al verificar usuario:', err);
      return res.status(500).send('Error al verificar el usuario');
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Query para actualizar el usuario
    const query = 'UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, telefono = ? WHERE id = ?';
    db.query(query, [nombre, apellido, email, telefono, id], (err, results) => {
      if (err) {
        console.error('Error al actualizar usuario:', err);
        return res.status(500).send('Error al actualizar usuario');
      }

      res.send('Usuario actualizado correctamente');
    });
  });
};

// Eliminar un usuario
export const deleteUsuario = (req, res) => {
  const { id } = req.params;

  // Verificar si el usuario existe antes de eliminar
  const checkUserQuery = 'SELECT * FROM usuarios WHERE id = ?';
  db.query(checkUserQuery, [id], (err, results) => {
    if (err) {
      console.error('Error al verificar usuario:', err);
      return res.status(500).send('Error al verificar el usuario');
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Query para eliminar el usuario
    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error al eliminar usuario:', err);
        return res.status(500).send('Error al eliminar usuario');
      }

      res.send('Usuario eliminado correctamente');
    });
  });
};


// Obtener un usuario por ID
export const getUsuarioById = (req, res) => {
  const { id } = req.params;  // Obtener el id desde los parámetros de la URL
  const query = 'SELECT * FROM usuarios WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener usuario:', err);
      return res.status(500).send('Error al obtener el usuario');
    }

    if (results.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }

    res.json(results[0]);  // Enviar el primer (y único) usuario encontrado
  });
}
