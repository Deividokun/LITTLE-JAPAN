import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './FilterHome.css' // External CSS file

function FilterHome() {
  const location = useLocation()
  const resultados = location.state?.resultados || []
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (id, event) => {
    event.stopPropagation() // Evita que el clic en el corazón redirija
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    )
  }

  return (
    <div className='results-container'>
      <h2>Filter Results:</h2>
      {resultados.length === 0 ? (
        <p>No accommodations match the selected filters.</p>
      ) : (
        <div className='results-grid'>
          {' '}
          {resultados.map((alojamiento) => (
            <NavLink
              to={`/detail/${alojamiento._id}`}
              className='card-accommodation'
              key={alojamiento._id}
            >
              <div className='card-image'>
                <img
                  src={alojamiento.imagenAlojamiento}
                  alt={alojamiento.nombreAlojamiento}
                />
                <div
                  className='heart-icon'
                  onClick={(e) => toggleFavorite(alojamiento._id, e)}
                >
                  {favorites.includes(alojamiento._id) ? '❤️' : '🤍'}
                </div>
              </div>
              <div className='card-content'>
                <h3>{alojamiento.nombreAlojamiento}</h3>
                <p className='description'>{alojamiento.descripcion}</p>
                <p>Price: ${alojamiento.precioNoche}/night</p>
                <p>Guests: {alojamiento.huespedes}</p>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterHome
