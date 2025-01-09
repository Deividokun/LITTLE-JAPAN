import React from 'react'
import { useNavigate } from 'react-router-dom'
import './heroe.css'

function Heroe() {
  const navigate = useNavigate()
  const handleImageClick = (event) => {
    event.preventDefault()

    // Verificar si el usuario está logueado (es decir, si hay un token en localStorage)
    const token = localStorage.getItem('token')
    if (!token) {
      alert('You need to be logged in to access this option.')
      return
    }

    // Si el usuario está logueado, navegar a la nueva ruta
    navigate('/add-house') // Cambia '/destination' por la ruta deseada
  }
  const handleNavigation = async (filterCriteria, event) => {
    event.preventDefault()

    try {
      // Construir los parámetros de consulta
      const queryParams = new URLSearchParams(filterCriteria).toString()

      // Enviar la solicitud con los filtros al backend
      const response = await fetch(
        `http://localhost:4000/api/v1/alojamientos/alojamientos?${queryParams}`
      )
      const resultados = await response.json()

      console.log('Results filtered from the server:', resultados)

      // Navegar con los resultados filtrados
      navigate('/filterhome', { state: { resultados } })
    } catch (error) {
      console.error('Error obtaining accommodations:', error)
    }
  }

  return (
    <div className='container-heroe'>
      <section>
        <article>
          <img
            src='/assets/lugaresHeroe/image.png'
            alt=''
            className='rent'
            onClick={handleImageClick}
          />
        </article>
      </section>
      <section className='sectionHeroeTwo'>
        <article>
          <h3>Popular Destinations in Japan</h3>
        </article>
        <article>
          <div
            className='image-container'
            onClick={(e) => handleNavigation({ ciudad: 'Tokio' }, e)}
          >
            <img src='/assets/lugaresHeroe/tokyo.jpg' alt='Tokyo' />
            <span className='image-title'>Tokyo 🎌</span>
          </div>
          <div
            className='image-container'
            onClick={(e) => handleNavigation({ ciudad: 'Osaka' }, e)}
          >
            <img src='/assets/lugaresHeroe/osaka.jpg' alt='Osaka' />
            <span className='image-title'>Osaka 🎌</span>
          </div>
          <div
            className='image-container'
            onClick={(e) => handleNavigation({ ciudad: 'Nara' }, e)}
          >
            <img src='/assets/lugaresHeroe/naara.jpg' alt='Nara' />
            <span className='image-title'>Nara 🎌</span>
          </div>
          <div
            className='image-container'
            onClick={(e) => handleNavigation({ ciudad: 'Hiroshima' }, e)}
          >
            <img src='/assets/lugaresHeroe/hiroshima.jpg' alt='Hiroshima' />
            <span className='image-title'>Hiroshima 🎌</span>
          </div>
          <div
            className='image-container'
            onClick={(e) => handleNavigation({ ciudad: 'Kioto' }, e)}
          >
            <img src='/assets/lugaresHeroe/kyoto.jpg' alt='Kyoto' />
            <span className='image-title'>Kyoto 🎌</span>
          </div>
        </article>
      </section>
      <section className='sectionHeroeThree'>
        <article>
          <h3>Search by Accommodation Type</h3>
        </article>
        <article>
          <div
            className='image-container'
            onClick={(e) =>
              handleNavigation({ tipoAlojamiento: 'Casa de Huéspedes' }, e)
            }
          >
            <img
              src='/assets/tipoAlojamientoHeroe/guestHouse.jpg'
              alt='GuestHouse'
            />
            <span className='image-title'>GuestHouse</span>
          </div>
          <div
            className='image-container'
            onClick={(e) =>
              handleNavigation({ tipoAlojamiento: 'Apartamento' }, e)
            }
          >
            <img
              src='/assets/tipoAlojamientoHeroe/apartamento.jpg'
              alt='Apartment'
            />
            <span className='image-title'>Apartment</span>
          </div>
          <div
            className='image-container'
            onClick={(e) => handleNavigation({ tipoAlojamiento: 'Hotel' }, e)}
          >
            <img src='/assets/tipoAlojamientoHeroe/hotel.jpg' alt='Hotel' />
            <span className='image-title'>Hotel</span>
          </div>
        </article>
      </section>
    </div>
  )
}

export default Heroe
