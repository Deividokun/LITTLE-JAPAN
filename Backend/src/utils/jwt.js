const jwt = require('jsonwebtoken')

const generarLlave = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '365d' })
}

const verificarLlave = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = { generarLlave, verificarLlave }
