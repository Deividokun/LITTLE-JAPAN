const express = require('express')
const { isAuth } = require('../../middlewares/auth')
const {
  getAlojamientos,
  getAlojamientoById,
  postAlojamiento,
  updateAlojamiento,
  deleteAlojamiento
} = require('../controller/alojamientos')

const alojamientoRouter = express.Router()

alojamientoRouter.get('/alojamientos', getAlojamientos)
alojamientoRouter.get('/:id', getAlojamientoById)
alojamientoRouter.post('/', [isAuth], postAlojamiento)
alojamientoRouter.put('/:id', updateAlojamiento)
alojamientoRouter.delete('/:id', deleteAlojamiento)

module.exports = alojamientoRouter
