const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
const Usuario = require('../api/models/users') // Ajusta la ruta a tu modelo
const bcrypt = require('bcrypt')

// Función para conectar a la base de datos
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
    process.exit(1) // Salir del proceso si no se puede conectar
  }
}

const cargarCSV = async () => {
  await conectarDB() // Asegurarse de que la conexión esté establecida antes de continuar

  const resultados = []

  // Ruta del archivo CSV
  const archivoPath = path.resolve(
    'src',
    'utils',
    'Data',
    'definitvoUsuarios.csv'
  )
  console.log('Ruta absoluta del archivo CSV:', archivoPath)

  // Leer el archivo CSV
  fs.createReadStream(archivoPath)
    .pipe(csv())
    .on('data', async (row) => {
      try {
        // Validar campos requeridos
        if (
          !row.NombreUsuario ||
          !row.NombreCompleto ||
          !row.contrasenas ||
          !row.Email
        ) {
          console.error('Fila con datos incompletos:', row)
          return
        }

        // Encriptar la contraseña
        const contrasenaEncriptada = await bcrypt.hash(row.contrasenas, 12)

        // Mapear los datos
        // Mapear los datos
        resultados.push({
          nombreUsuario: row.NombreUsuario,
          nombreCompleto: row.NombreCompleto,
          contrasena: contrasenaEncriptada,
          experiencia: isNaN(parseInt(row.Experiencia))
            ? 0
            : parseInt(row.Experiencia),
          valoracion: isNaN(parseFloat(row.Valoracion))
            ? 0
            : parseFloat(row.Valoracion),
          imagenUsuario: row.ImagenUsuario,
          numeroDocumento: row.Numerodedocumento || '',
          tipoDocumento: row.Tipodedocumento || 'DNI', // Valor predeterminado
          telefono: row.Telefono || '',
          edad: isNaN(parseInt(row.Edad)) ? 0 : parseInt(row.Edad),
          email: row.Email,
          reservas: row.Reservas
            ? row.Reservas.split(',').map((item) => item.trim())
            : [],
          favoritos: row.Favoritos
            ? row.Favoritos.split(',').map((item) => item.trim())
            : []
        })
      } catch (err) {
        console.error('Error al procesar fila:', row, err)
      }
    })
    .on('end', async () => {
      try {
        await Usuario.deleteMany({}) // Borrar los datos existentes
        await Usuario.insertMany(resultados) // Insertar los nuevos datos
        console.log('Datos cargados exitosamente con contraseñas encriptadas')
      } catch (err) {
        console.error('Error al insertar los datos:', err)
      } finally {
        mongoose.disconnect() // Desconectar después de terminar
      }
    })
}

// Ejecutar la función de carga
cargarCSV()
