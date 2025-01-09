import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './filter.css'

function Filter() {
  const [tipoAlojamiento, setTipoAlojamiento] = useState('')
  const [precio, setPrecio] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [huespedes, setHuespedes] = useState()

  const navigate = useNavigate()

  const handleFilter = async () => {
    try {
      // Crear la URL con los parámetros de consulta dinámicamente
      const queryParams = new URLSearchParams({
        tipoAlojamiento: tipoAlojamiento, // No hace falta verificar si está vacío
        ciudad: ciudad, // Si es vacío, lo envía igual
        precio: precio, // Si es vacío o 0, lo envía igual
        huespedes: huespedes // Igual para huéspedes, aunque tenga el valor 1
      }).toString()

      // Enviar la solicitud al backend con los parámetros de consulta
      const response = await fetch(
        `http://localhost:4000/api/v1/alojamientos/alojamientos?${queryParams}`
      )

      if (!response.ok) {
        throw new Error('Error al filtrar alojamientos. Inténtalo de nuevo.')
      }

      const resultadosFiltrados = await response.json()
      console.log(
        'Resultados filtrados desde el servidor:',
        resultadosFiltrados
      )

      // Navegar a la página de resultados con los datos
      navigate('/filterhome', { state: { resultados: resultadosFiltrados } })
    } catch (error) {
      console.error('Error al filtrar alojamientos:', error)
      alert('Hubo un problema al realizar la búsqueda. Inténtalo nuevamente.')
    }
  }

  return (
    <div className='filter-container'>
      <div className='filter-accommomodation'>
        <div className='filter-item'>
          <label htmlFor='tipo-alojamiento'>Type of Accommodation</label>
          <select
            id='tipo-alojamiento'
            value={tipoAlojamiento}
            onChange={(e) => setTipoAlojamiento(e.target.value)}
          >
            <option value=''>Select the accommodation</option>
            <option value='Hotel'>Hotel</option>
            <option value='Casa de Huéspedes'>Guesthouse</option>
            <option value='Apartamento'>Apartment</option>
          </select>
        </div>

        <div className='filter-item'>
          <label htmlFor='precio'>Maximum Price per Night</label>
          <input
            type='number'
            id='precio'
            placeholder='Filter per price'
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            min='0'
          />
        </div>

        <div className='filter-item'>
          <label htmlFor='ciudad'>City</label>
          <select
            id='ciudad'
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          >
            <option value=''>Select the city</option>
            <option value='Tokio'>Tokyo</option>
            <option value='Nara'>Nara</option>
            <option value='Osaka'>Osaka</option>
            <option value='Hiroshima'>Hiroshima</option>
            <option value='Kioto'>Kyoto</option>
          </select>
        </div>

        <div className='filter-item'>
          <label htmlFor='huespedes'>Number of Guests</label>
          <input
            type='number'
            id='huespedes'
            value={huespedes}
            placeholder='how many people?'
            onChange={(e) => setHuespedes(e.target.value)}
            min='1'
          />
        </div>

        <div className='buttonSubmit'>
          <img
            src='/assets/lugaresHeroe/lupa.png'
            alt='search icon'
            onClick={handleFilter}
            className='lupa'
          />
        </div>
      </div>
    </div>
  )
}

export default Filter
