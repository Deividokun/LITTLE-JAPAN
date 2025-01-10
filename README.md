fronted: 
🏨 Frontend: Proyecto Final - Página Web de Alojamientos
📖 Descripción

Este es el frontend de una plataforma de alojamientos que permite a los usuarios explorar, reservar y guardar alojamientos como favoritos. Ofrece una experiencia intuitiva y eficiente con funciones como registro, inicio de sesión, agregar alojamientos, contacto y soporte.

🚀 Funcionalidades Principales

Exploración de alojamientos: Visualiza una lista de hoteles, apartamentos y casas de huéspedes.
Filtros avanzados: Filtra alojamientos según tus preferencias.
Página de detalles: Visualiza información detallada de cada alojamiento.
Autenticación de usuarios: Registro e inicio de sesión.
Gestión de alojamientos: Agrega y administra alojamientos (para anfitriones).
Páginas informativas:
"Contact Us" para soporte.
"Help Us" para recibir retroalimentación.
Diseño responsivo: Optimizado para dispositivos móviles, tablets y desktops.

🛠️ Tecnologías Utilizadas

Vite + React: Base del frontend, proporcionando una experiencia de desarrollo rápida y moderna.
React Router DOM: Manejo de rutas dinámicas y navegación entre páginas.
React Hook Form: Gestión eficiente de formularios.
React Select: Componente de selección mejorado para filtros.
CSS: Estilos personalizados.

🗂️ Estructura del Proyecto

src/
├── components/
│   ├── Header/        # Encabezado
│   ├── Filter/        # Filtros para alojamientos
│   ├── Footer/        # Pie de página
├── pages/
│   ├── accommodationReg/  # Formulario para agregar alojamientos
│   ├── contactUs/         # Página de contacto
│   ├── filterHome/        # Página principal con filtros
│   ├── help/              # Página de ayuda
│   ├── heroe/             # Página principal de bienvenida
│   ├── hostingView/       # Página de detalles del alojamiento
│   ├── login/             # Página de inicio de sesión
│   ├── register/          # Página de registro de usuarios
├── App.js                 # Componente raíz
├── App.css                # Estilos globales

⚙️ Requisitos Previos

Tener instalado Node.js.
Clonar el repositorio del backend y asegurarte de que está corriendo.

📋 Rutas de la Aplicación

Ruta	Componente	Descripción
/	Heroe	Página principal de bienvenida
/help	HelpComponent	Página de ayuda
/contactUs	ContactUs	Página de contacto
/filterhome	FilterHome	Página con lista de alojamientos
/detail/:id	HostingCard	Página de detalles de alojamiento
/login	LoginUser	Página de inicio de sesión
/register	RegisterUser	Página de registro
/add-house	AddAlojamientoForm	Formulario para agregar alojamientos

📄 Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

BACKEND: 

🏨 Backend: Proyecto Final - Plataforma de Alojamientos

📖 Descripción
Este es el backend de una plataforma de alojamientos que permite a los usuarios gestionar alojamientos, reservas y usuarios. Proporciona endpoints para funcionalidades como registro, inicio de sesión, agregar alojamientos, consultar detalles, y más.

🚀 Funcionalidades Principales

Gestión de alojamientos: Crear, leer, actualizar y eliminar alojamientos.
Autenticación y autorización: Registro e inicio de sesión de usuarios.
Rutas protegidas: Algunas rutas requieren autenticación con JSON Web Token (JWT).
Soporte para servicios adicionales: Contacto y servicios relacionados.
Manejo de errores: Respuestas claras y adecuadas para cada caso.
Diseño modular: Rutas, controladores y utilidades organizados.

🛠️ Tecnologías Utilizadas

Node.js: Entorno de ejecución para el servidor.
Express.js: Framework para construir la API.
Mongoose: Modelado de datos para MongoDB.
bcrypt: Encriptación de contraseñas.
jsonwebtoken (JWT): Autenticación y autorización segura.
dotenv: Manejo de variables de entorno.
multer: Gestión de archivos subidos.
cors: Permitir solicitudes desde diferentes orígenes.
nodemon: Recarga automática durante el desarrollo.

🗂️ Estructura del Proyecto
src/
├── api/
│   ├── controllers/        # Controladores para manejar lógica de negocio
│   ├── routes/             # Definición de rutas
├── config/
│   ├── db.js               # Conexión a la base de datos MongoDB
├── utils/
│   ├── seed.js             # Script para pre-cargar datos
│   ├── seedUs.js           # Script para pre-cargar usuarios
│   ├── seedSer.js          # Script para pre-cargar servicios

⚙️ Requisitos Previos
Tener instalado Node.js.
Tener configurada una base de datos MongoDB.
Configurar un archivo .env con las siguientes variables:
PORT=4000
MONGO_URI=tu_ruta_de_mongoDB
JWT_SECRET=tu_clave_secreta

📋 Endpoints Principales
Usuarios
Método	Ruta	Descripción
POST	/api/v1/usuarios	Crear un usuario
POST	/api/v1/usuarios/login	Iniciar sesión
GET	/api/v1/usuarios/:id	Obtener datos de un usuario

Alojamientos
Método	Ruta	Descripción
GET	/api/v1/alojamientos	Obtener todos los alojamientos
POST	/api/v1/alojamientos	Crear un nuevo alojamiento
GET	/api/v1/alojamientos/:id	Obtener detalles de un alojamiento
DELETE	/api/v1/alojamientos/:id	Eliminar un alojamiento

Servicios
Método	Ruta	Descripción
GET	/api/v1/servicio	Obtener todos los servicios

📄 Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
