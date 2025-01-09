import React from 'react'
import './servicesView.css'

function ServicesView({ servicios }) {
  return (
    <article className='serviciesView'>
      <h2>What is included in this accommodation?</h2>
      <div className='servicesContainer'>
        {servicios && servicios.length > 0 ? (
          servicios.map((servicio, index) => (
            <div key={index} className='service'>
              <img
                src={servicio.imagen}
                alt={servicio.nombre}
                className='servicesimage'
              />
              <p>{servicio.nombre}</p>
            </div>
          ))
        ) : (
          <p>There are no services available.</p>
        )}
      </div>
    </article>
  )
}

export default ServicesView
