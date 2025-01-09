const express = require('express')
const { isAuth } = require('../../middlewares/auth')
const {
  getUsuarios,
  getUsuarioById,
  RegisterUsuario,
  loginUsuario,
  updateUsuario,
  deleteUsuario
} = require('../controller/users')

const usuarioRouter = express.Router()

usuarioRouter.get('/', getUsuarios)
usuarioRouter.get('/:id', getUsuarioById)
usuarioRouter.post('/register', RegisterUsuario)
usuarioRouter.post('/login', loginUsuario)
usuarioRouter.put('/:id', [isAuth], updateUsuario)
usuarioRouter.delete('/:id', [isAuth], deleteUsuario)

module.exports = usuarioRouter
