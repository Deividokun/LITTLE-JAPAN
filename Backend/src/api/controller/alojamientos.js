const Alojamiento = require('../models/alojamientos')
const Servicio = require('../models/servicios')

const getAlojamientos = async (req, res) => {
  try {
    const { tipoAlojamiento, ciudad, precio, huespedes } = req.query

    // Construir la consulta basada en los parámetros
    const query = {}
    if (tipoAlojamiento) query.tipoAlojamiento = tipoAlojamiento
    if (ciudad) query.ciudad = ciudad
    if (precio) {
      const precioNumber = parseFloat(precio)
      if (!isNaN(precioNumber)) query.precioNoche = { $lte: precioNumber }
    }
    if (huespedes) {
      const huespedesNumber = parseInt(huespedes)
      if (!isNaN(huespedesNumber)) query.huespedes = { $gte: huespedesNumber }
    }

    // Buscar alojamientos y popular datos del propietario y servicios
    const alojamientos = await Alojamiento.find(query)
      .populate(
        'propietario',
        'nombreUsuario nombreCompleto imagenUsuario experiencia telefono'
      )
      .populate('servicios', 'nombre descripcion imagen') // Popular servicios

    res.status(200).json(alojamientos)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener alojamientos' })
  }
}

const getAlojamientoById = async (req, res) => {
  try {
    const { id } = req.params

    // Buscar alojamiento por ID y popular datos
    const alojamiento = await Alojamiento.findById(id)
      .populate(
        'propietario',
        'nombreUsuario nombreCompleto imagenUsuario telefono experiencia valoracion'
      )
      .populate('servicios', 'nombre descripcion imagen') // Popular servicios

    if (!alojamiento) {
      return res.status(404).json({ error: 'Alojamiento no encontrado' })
    }

    res.status(200).json(alojamiento)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el alojamiento' })
  }
}

// Crear un nuevo alojamiento
const postAlojamiento = async (req, res) => {
  const {
    tipoAlojamiento,
    huespedes,
    imagenAlojamiento,
    descripcion,
    nombreAlojamiento,
    ciudad,
    precioNoche,
    servicios // Cambié 'Servicio' a 'servicios'
  } = req.body

  const propietarioId = req.user.id // ID del propietario del token autenticado

  try {
    // Validar que los servicios enviados existan en la base de datos
    if (servicios && servicios.length > 0) {
      const serviciosExistentes = await Servicio.find({
        _id: { $in: servicios }
      })

      if (serviciosExistentes.length !== servicios.length) {
        return res
          .status(400)
          .json({ error: 'Algunos servicios no son válidos' })
      }
    }

    // Crear el nuevo alojamiento
    const nuevoAlojamiento = new Alojamiento({
      tipoAlojamiento,
      huespedes,
      imagenAlojamiento,
      descripcion,
      nombreAlojamiento,
      ciudad,
      precioNoche,
      propietario: propietarioId,
      servicios // Utilizo 'servicios' para asociar los servicios
    })

    await nuevoAlojamiento.save()

    res.status(201).json({
      message: 'Alojamiento creado con éxito',
      alojamiento: nuevoAlojamiento
    })
  } catch (error) {
    console.error('Error al crear alojamiento:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

module.exports = {
  getAlojamientos,
  getAlojamientoById,
  postAlojamiento
}

// Actualizar un alojamiento por IDmg
const updateAlojamiento = async (req, res) => {
  try {
    const alojamiento = await Alojamiento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!alojamiento) {
      return res.status(404).json({ error: 'Alojamiento no encontrado' })
    }
    res.status(200).json(alojamiento)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar alojamiento' })
  }
}

// Eliminar un alojamiento por ID
const deleteAlojamiento = async (req, res) => {
  try {
    const alojamiento = await Alojamiento.findByIdAndDelete(req.params.id)
    if (!alojamiento) {
      return res.status(404).json({ error: 'Alojamiento no encontrado' })
    }
    res.status(200).json({ message: 'Alojamiento eliminado' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar alojamiento' })
  }
}

module.exports = {
  getAlojamientos,
  getAlojamientoById,
  postAlojamiento,
  updateAlojamiento,
  deleteAlojamiento
}
