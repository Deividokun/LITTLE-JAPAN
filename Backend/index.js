require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const alojamientoRouter = require('./src/api/routes/alojamientos')
const usersRouter = require('./src/api/routes/users')
const servicioRouter = require('./src/api/routes/servicio')

const cors = require('cors')

const app = express()

connectDB()

app.use(express.json())
app.use(cors())

app.use('/api/v1/alojamientos', alojamientoRouter)
app.use('/api/v1/usuarios', usersRouter)
app.use('/api/v1/servicio', servicioRouter)
app.use('*', (req, res, next) => {
  return res.status(404).json('Route Not Found')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
