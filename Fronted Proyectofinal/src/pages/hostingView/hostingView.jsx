import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HostingCardView from '../../components/hostingCardView/hostingCardView'
import OwnerCard from '../../components/ownerCard/ownerCard'
import ReservationView from '../../components/reservationView/reservationView'
import ServicesView from '../../components/servicesView/servicesView'
import './hostingView.css'

const HostingCard = () => {
  const { id } = useParams()
  const [accommodation, setAccommodation] = useState(null)

  useEffect(() => {
    const fetchAlojamiento = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/alojamientos/${id}`
        )
        const data = await response.json()
        console.log('Respuesta completa:', data)

        setAccommodation(data)
      } catch (error) {
        console.error('Error al obtener los detalles:', error)
      }
    }

    fetchAlojamiento()
  }, [id])

  if (!accommodation) {
    return <p>Cargando...</p>
  }

  // Verifica si la propiedad 'propietario' existe antes de intentar acceder a ella
  const propietario = accommodation.propietario || {}
  console.log(propietario) // Verifica si 'propietario' está correctamente definido

  return (
    <div className='viewAccommodation'>
      <section>
        <img
          src={accommodation.imagenAlojamiento}
          alt=''
          className='imaginetitle'
        />
      </section>
      <section className='row'>
        <HostingCardView
          nombreAlojamiento={accommodation.nombreAlojamiento}
          huespedes={accommodation.huespedes}
          descripcion={accommodation.descripcion}
        />
        <ReservationView
          nochesAlojamiento={accommodation.precioNoche}
          huespedes={accommodation.huespedes}
        />
      </section>
      <section>
        <ServicesView servicios={accommodation?.servicios || []} />
      </section>
      <section>
        {propietario && propietario.nombreUsuario ? (
          <OwnerCard
            imagenPropietario={propietario.imagenUsuario || 'default_image.jpg'} // Usa una imagen predeterminada si no existe
            nombreUsuario={propietario.nombreUsuario || 'Nombre no disponible'}
            experienciaUsuario={propietario.experiencia || 'No disponible'}
            valoracionUsuario={propietario.valoracion || 'No disponible'}
            telefonoUsuario={propietario.telefono || 'No disponible'}
          />
        ) : (
          <p>Owner information is not available.</p> // Mensaje si no hay datos del propietario
        )}
      </section>
    </div>
  )
}

export default HostingCard
