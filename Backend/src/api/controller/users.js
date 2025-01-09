const Usuario = require('../models/users')
const bcrypt = require('bcrypt')
const { generarLlave } = require('../../utils/jwt')
// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find()
    res.status(200).json(usuarios)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
}

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id)
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.status(200).json(usuario)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' })
  }
}
const RegisterUsuario = async (req, res) => {
  try {
    const {
      nombreUsuario,
      contrasena,
      nombreCompleto,
      experiencia,
      imagenUsuario,
      numeroDocumento,
      tipoDocumento,
      telefono,
      edad,
      email
    } = req.body

    // Verificar que todos los campos necesarios estén presentes
    if (
      !nombreUsuario ||
      !contrasena ||
      !nombreCompleto ||
      !experiencia ||
      !imagenUsuario ||
      !numeroDocumento ||
      !tipoDocumento ||
      !telefono ||
      !edad ||
      !email
    ) {
      return res
        .status(400)
        .json({ error: 'Faltan datos necesarios para registrar el usuario' })
    }

    // Verificar si el correo ya está en uso
    const usuarioExistente = await Usuario.findOne({ email })
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo ya está en uso' })
    }

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombreUsuario,
      contrasena,
      nombreCompleto,
      experiencia,
      imagenUsuario,
      numeroDocumento,
      tipoDocumento,
      telefono,
      edad,
      email
    })

    console.log(
      'Contraseña recibida antes de guardar:',
      nuevoUsuario.contrasena
    )

    // El middleware de Mongoose se encarga de encriptar la contraseña antes de guardar el usuario
    await nuevoUsuario.save()

    console.log(
      'Contraseña encriptada después de guardar:',
      nuevoUsuario.contrasena
    )

    // Generar token JWT
    const token = generarLlave({
      id: nuevoUsuario._id,
      nombreUsuario: nuevoUsuario.nombreUsuario
    })

    res.status(201).json({
      message: 'Registro exitoso',
      usuario: {
        id: nuevoUsuario._id,
        nombreUsuario: nuevoUsuario.nombreUsuario
      },
      token
    })
  } catch (error) {
    console.error('Error al registrar usuario:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const loginUsuario = async (req, res) => {
  try {
    const { nombreUsuario, contrasena } = req.body

    // Eliminar espacios extra
    const contrasenaLimpiada = contrasena.trim()

    console.log('Intento de login para usuario:', nombreUsuario)
    console.log('Contraseña proporcionada (limpia):', contrasenaLimpiada)

    const usuario = await Usuario.findOne({ nombreUsuario })
    console.log('Usuario encontrado:', usuario ? 'Sí' : 'No')

    if (!usuario) {
      console.log('Usuario no encontrado en la base de datos')
      return res.status(400).json({ error: 'Credenciales inválidas' })
    }

    console.log('Contraseña almacenada (hash):', usuario.contrasena)

    // Verificar contraseña
    const isMatch = await bcrypt.compare(contrasenaLimpiada, usuario.contrasena)

    console.log('¿Coincide la contraseña?', isMatch)

    if (!isMatch) {
      console.log('La contraseña no coincide')
      return res.status(400).json({ error: 'Credenciales inválidas' })
    }

    // Generar y devolver el token JWT usando la función personalizada
    const token = generarLlave(usuario._id)

    console.log('Login exitoso para usuario:', nombreUsuario)

    res.json({
      message: 'Login exitoso',
      usuario: { id: usuario._id, nombreUsuario: usuario.nombreUsuario },
      token
    })
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
// Actualizar un usuario por ID
const updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.status(200).json(usuario)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' })
  }
}

// Eliminar un usuario por ID
const deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id)
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.status(200).json({ message: 'Usuario eliminado' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' })
  }
}

module.exports = {
  getUsuarios,
  getUsuarioById,
  RegisterUsuario,
  loginUsuario,
  updateUsuario,
  deleteUsuario
}
