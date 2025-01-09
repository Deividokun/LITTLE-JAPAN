const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Define el esquema del usuario
const usuarioSchema = new mongoose.Schema(
  {
    nombreUsuario: { type: String, required: true, trim: true },
    nombreCompleto: { type: String, required: true, trim: true },
    contrasena: { type: String, required: true },
    experiencia: { type: Number, required: false, min: 0 },
    valoracion: { type: Number, min: 0, max: 5, default: 0 }, // Cambiado
    imagenUsuario: { type: String, required: true },
    numeroDocumento: { type: String, required: true, unique: true },
    tipoDocumento: {
      type: String,
      required: true,
      enum: ['DNI', 'Pasaporte', 'Otro']
    },
    telefono: { type: String, required: true },
    edad: { type: Number, required: true, min: 0 },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Alojamiento' }],
    reservas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Alojamiento' }]
  },
  {
    timestamps: true,
    collection: 'usuarios'
  }
)

// Middleware para encriptar contraseñas antes de guardar
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contrasena')) return next() // Solo encripta si la contraseña fue modificada
  try {
    console.log('Contraseña antes del hash:', this.contrasena)
    this.contrasena = await bcrypt.hash(this.contrasena, 12)
    console.log('Contraseña encriptada después del hash:', this.contrasena)
    next()
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error)
    next(error)
  }
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario
