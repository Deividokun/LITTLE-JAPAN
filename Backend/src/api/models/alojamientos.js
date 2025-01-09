const mongoose = require('mongoose')

// Modelo de alojamientos
const alojamientoSchema = new mongoose.Schema(
  {
    tipoAlojamiento: { type: String, required: true },
    huespedes: { type: Number, required: true },
    ciudad: { type: String, required: true },
    propietario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    precioNoche: { type: Number, required: true },
    imagenAlojamiento: { type: String, required: true },
    nombreAlojamiento: { type: String, required: true },
    descripcion: { type: String, required: true },
    servicios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servicio' }]
  },
  {
    timestamps: true,
    collection: 'alojamientos'
  }
)

const Alojamiento = mongoose.model('Alojamiento', alojamientoSchema)

module.exports = Alojamiento
