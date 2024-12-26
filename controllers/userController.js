const { users } = require('../models'); // Asegúrate de que esta ruta sea correcta
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de Multer para el manejo de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Guardar con timestamp
  }
});
const upload = multer({ storage: storage });

// Crear un nuevo usuario
exports.createUser = (req, res) => {
  const { nombre, apellido, email, password } = req.body;
  const imagen_perfil = req.file ? req.file.filename : null;

  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos excepto la imagen de perfil son obligatorios.' });
  }

  bcrypt.hash(password, 10).then(hashedPassword => {
    return users.create({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      imagen_perfil
    });
  }).then(user => {
    res.status(201).json({ message: 'Usuario creado exitosamente', user });
  }).catch(error => {
    res.status(500).json({ error: error.message });
  });
};

// Middleware para subir imagen
exports.uploadImage = upload.single('imagen_perfil');

// Listar todos los usuarios
exports.listUsers = (req, res) => {
  users.findAll().then(users => {
    res.status(200).json(users);
  }).catch(error => {
    res.status(500).json({ error: error.message });
  });
};

// Actualizar un usuario
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, password } = req.body;
  const newImage = req.file ? req.file.filename : null;

  users.findByPk(id).then(user => {
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (newImage && user.imagen_perfil) {
      fs.unlinkSync(`uploads/${user.imagen_perfil}`);
    }

    const updateData = {
      nombre: nombre || user.nombre,
      apellido: apellido || user.apellido,
      email: email || user.email,
      imagen_perfil: newImage || user.imagen_perfil
    };

    if (password) {
      return bcrypt.hash(password, 10).then(hashedPassword => {
        updateData.password = hashedPassword;
        return user.update(updateData);
      });
    }

    return user.update(updateData);
  }).then(updatedUser => {
    res.status(200).json({ message: 'Usuario actualizado exitosamente', updatedUser });
  }).catch(error => {
    res.status(500).json({ error: error.message });
  });
};

// Eliminar un usuario
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  users.findByPk(id).then(user => {
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (user.imagen_perfil) {
      fs.unlinkSync(`uploads/${user.imagen_perfil}`);
    }

    return user.destroy();
  }).then(() => {
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  }).catch(error => {
    res.status(500).json({ error: error.message });
  });
};