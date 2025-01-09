const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
const Servicio = require('../api/models/servicios')

const conectarDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://davitarm123:CYxUmAbAOp5he1zU@finalproject.bzjcn.mongodb.net/?retryWrites=true&w=majority&appName=FINALPROJECT',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    console.log('Conexión a MongoDB exitosa')
  } catch (err) {
    console.error('Error de conexión a MongoDB:', err)
    process.exit(1)
  }
}

const cargarServiciosCSV = async () => {
  await conectarDB()

  const resultados = []

  const archivoPath = path.resolve('src', 'utils', 'Data', 'servicios.csv')
  console.log('Ruta absoluta del archivo CSV:', archivoPath)

  fs.createReadStream(archivoPath)
    .pipe(csv())
    .on('data', (row) => {
      console.log('Fila procesada:', row)

      if (row.Nombre && row.Descripcion && row.Imagen) {
        resultados.push({
          nombre: row.Nombre,
          descripcion: row.Descripcion,
          imagen: row.Imagen
        })
      }
    })
    .on('error', (error) => {
      console.error('Error leyendo CSV:', error)
    })
    .on('end', async () => {
      try {
        console.log('Resultados a insertar:', resultados)

        await Servicio.deleteMany({})
        const insertados = await Servicio.insertMany(resultados)

        console.log('Servicios cargados:', insertados.length)
      } catch (err) {
        console.error('Error al insertar los servicios:', err)
      } finally {
        mongoose.disconnect()
      }
    })
}

cargarServiciosCSV()
