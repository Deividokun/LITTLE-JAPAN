const mongoose = require('mongoose')

const servicioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'servicios'
  }
)

const Servicio = mongoose.model('Servicio', servicioSchema)

module.exports = Servicio
