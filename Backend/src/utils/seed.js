const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const csvParser = require('csv-parser')
const Alojamiento = require('../api/models/alojamientos') // Ruta del modelo de alojamientos
const Usuario = require('../api/models/users') // Ruta del modelo de usuarios
const Servicio = require('../api/models/servicios') // Ruta del modelo de servicios

// Conexión a MongoDB
mongoose
  .connect(
    'mongodb+srv://davitarm123:CYxUmAbAOp5he1zU@finalproject.bzjcn.mongodb.net/?retryWrites=true&w=majority&appName=FINALPROJECT',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((err) => console.error('Error de conexión a MongoDB:', err))

// Ruta al archivo CSV
const archivoCSV = path.join('src', 'utils', 'Data', 'alojamientos.csv')

// Función para seleccionar servicios aleatorios
const seleccionarServiciosAleatorios = (servicios, cantidad) => {
  const seleccionados = []
  const copiaServicios = [...servicios]

  for (let i = 0; i < cantidad; i++) {
    if (copiaServicios.length === 0) break // Si no quedan servicios, detener
    const indiceAleatorio = Math.floor(Math.random() * copiaServicios.length)
    seleccionados.push(copiaServicios[indiceAleatorio])
    copiaServicios.splice(indiceAleatorio, 1) // Eliminar el servicio seleccionado
  }

  return seleccionados
}

// Función para cargar los alojamientos del CSV
const cargarCSV = async () => {
  const alojamientos = []
  const usuarios = await Usuario.find() // Obtener todos los usuarios de la base de datos
  const servicios = await Servicio.find() // Obtener todos los servicios de la base de datos

  if (usuarios.length === 0)
    throw new Error('No hay usuarios disponibles en la base de datos.')
  if (servicios.length === 0)
    throw new Error('No hay servicios disponibles en la base de datos.')

  let indiceUsuario = 0 // Índice para asignar usuarios secuencialmente

  return new Promise((resolve, reject) => {
    fs.createReadStream(archivoCSV)
      .pipe(csvParser())
      .on('data', (data) => {
        // Asignar propietario único
        const propietarioId = usuarios[indiceUsuario]._id
        console.log(
          `Asignando propietario: ${usuarios[indiceUsuario].nombreUsuario} (ID: ${propietarioId})`
        )

        // Incrementar el índice, reiniciarlo si excede la cantidad de usuarios
        indiceUsuario = (indiceUsuario + 1) % usuarios.length

        // Seleccionar 2-3 servicios aleatorios
        const serviciosAleatorios = seleccionarServiciosAleatorios(
          servicios,
          Math.floor(Math.random() * 2) + 4
        )

        // Crear objeto del alojamiento
        alojamientos.push({
          tipoAlojamiento: data.tipoAlojamiento.trim(),
          huespedes: isNaN(parseInt(data.Numerodehuespedes))
            ? 0
            : parseInt(data.Numerodehuespedes),
          ciudad: data.Ciudad.trim(),
          propietario: propietarioId, // Asignar el ID del propietario
          precioNoche: isNaN(parseFloat(data.PrecioNoche))
            ? 0
            : parseFloat(data.PrecioNoche),
          imagenAlojamiento: data.Imagen.trim(),
          nombreAlojamiento: data.Nombre.trim(),
          descripcion: data.Descripcion.trim(),
          servicios: serviciosAleatorios.map((servicio) => servicio._id) // Asignar IDs de los servicios
        })
      })
      .on('end', () => {
        console.log('Datos de alojamientos procesados:', alojamientos)
        resolve(alojamientos)
      })
      .on('error', (error) => reject(error))
  })
}

// Función principal para cargar los alojamientos a la base de datos
const ejecutarProceso = async () => {
  try {
    const alojamientos = await cargarCSV()
    console.log(`Alojamientos cargados del CSV: ${alojamientos.length}`)

    // Eliminar datos previos para evitar duplicados
    await Alojamiento.deleteMany({})
    console.log('Alojamientos previos eliminados')

    // Insertar alojamientos en la base de datos
    const resultados = await Alojamiento.insertMany(alojamientos)
    console.log(`Alojamientos insertados: ${resultados.length}`)
  } catch (error) {
    console.error('Error al cargar los alojamientos:', error)
  } finally {
    // Cerrar la conexión
    await mongoose.disconnect()
    console.log('Conexión a MongoDB cerrada')
  }
}

// Ejecutar el proceso
ejecutarProceso()
