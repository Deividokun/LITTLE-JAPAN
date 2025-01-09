const Servicio = require('../models/servicios')

// Obtener todos los servicios
const getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find()
    res.status(200).json(servicios)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los servicios' })
  }
}

// Obtener un servicio por ID
const getServicioById = async (req, res) => {
  try {
    const servicio = await Servicio.findById(req.params.id)
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' })
    }
    res.status(200).json(servicio)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el servicio' })
  }
}

// Registrar un nuevo servicio
const registerServicio = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body

    // Crear un nuevo servicio
    const nuevoServicio = new Servicio({
      nombre,
      descripcion
    })

    await nuevoServicio.save()

    res.status(201).json({
      message: 'Servicio registrado exitosamente',
      servicio: {
        id: nuevoServicio._id,
        nombre: nuevoServicio.nombre,
        descripcion: nuevoServicio.descripcion
      }
    })
  } catch (error) {
    console.error('Error al registrar el servicio:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

// Actualizar un servicio por ID
const updateServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' })
    }
    res.status(200).json(servicio)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el servicio' })
  }
}

// Eliminar un servicio por ID
const deleteServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByIdAndDelete(req.params.id)
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' })
    }
    res.status(200).json({ message: 'Servicio eliminado exitosamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el servicio' })
  }
}

module.exports = {
  getServicios,
  getServicioById,
  registerServicio,
  updateServicio,
  deleteServicio
}
