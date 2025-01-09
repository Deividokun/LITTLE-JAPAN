const express = require('express')
const { isAuth } = require('../../middlewares/auth') // Middleware de autenticación
const {
  getServicios,
  getServicioById,
  registerServicio,
  updateServicio,
  deleteServicio
} = require('../controller/servicio')

const servicioRouter = express.Router()

// Rutas para los servicios
servicioRouter.get('/', getServicios) // Obtener todos los servicios
servicioRouter.get('/:id', getServicioById) // Obtener servicio por ID
servicioRouter.post('/postRegister', registerServicio) // Registrar un nuevo servicio (requiere autenticación)
servicioRouter.put('/:id', [isAuth], updateServicio) // Actualizar un servicio por ID (requiere autenticación)
servicioRouter.delete('/:id', [isAuth], deleteServicio) // Eliminar un servicio por ID (requiere autenticación)

module.exports = servicioRouter
