import React from 'react'
import Select from 'react-select'
import useAlojamientoForm from '../../hooks/useAlojamientoForm'
import useFetch from '../../hooks/useFetch'
import './accommodationReg.css'

const AddAlojamientoForm = () => {
  // Hook para manejar el formulario
  const { state, handleChange, handleSubmit, isSubmitting } =
    useAlojamientoForm()

  // Hook para obtener los servicios
  const {
    data: servicios,
    loading,
    error
  } = useFetch('http://localhost:4000/api/v1/servicio')

  // Mapeo de servicios para react-select
  const mappedServicios = servicios?.map((servicio) => ({
    value: servicio._id,
    label: servicio.nombre
  }))

  return (
    <>
      <h2>Add New Accommodation</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(
            'http://localhost:4000/api/v1/alojamientos',
            localStorage.getItem('token')
          )
        }}
        className='RegisterHouseForm'
      >
        <div>
          <label>Accommodation Type:</label>
          <select
            value={state.tipoAlojamiento}
            onChange={(e) => handleChange('tipoAlojamiento', e.target.value)}
          >
            <option value='Guest House'>Guest House</option>
            <option value='Apartment'>Apartment</option>
            <option value='Hotel'>Hotel</option>
          </select>
        </div>

        <div>
          <label>Number of Guests:</label>
          <input
            type='number'
            value={state.huespedes}
            onChange={(e) => handleChange('huespedes', Number(e.target.value))}
            min='1'
          />
        </div>

        <div>
          <label>City:</label>
          <select
            value={state.ciudad}
            onChange={(e) => handleChange('ciudad', e.target.value)}
          >
            <option value=''>Select a city</option>{' '}
            {/* Asegúrate de que esta opción no sea seleccionada por defecto */}
            <option value='Tokyo'>Tokyo</option>
            <option value='Kyoto'>Kyoto</option>
            <option value='Nara'>Nara</option>
            <option value='Hiroshima'>Hiroshima</option>
            <option value='Osaka'>Osaka</option>
          </select>
        </div>

        <div>
          <label>Price per Night:</label>
          <input
            type='number'
            value={state.precioNoche}
            onChange={(e) =>
              handleChange('precioNoche', Number(e.target.value))
            }
            min='0'
          />
        </div>

        <div>
          <label>Accommodation Name:</label>
          <input
            type='text'
            value={state.nombreAlojamiento}
            onChange={(e) => handleChange('nombreAlojamiento', e.target.value)}
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={state.descripcion}
            onChange={(e) => handleChange('descripcion', e.target.value)}
            rows='4'
          ></textarea>
        </div>

        <div>
          <label>Image URL:</label>
          <input
            type='text'
            value={state.imagenAlojamiento}
            onChange={(e) => handleChange('imagenAlojamiento', e.target.value)}
          />
        </div>

        <div>
          <label>Services:</label>
          {loading && <p>Loading services...</p>}
          {error && <p>Error loading services: {error}</p>}
          {!loading && !error && mappedServicios && (
            <Select
              isMulti
              options={mappedServicios}
              value={state.servicios.map((id) =>
                mappedServicios.find((s) => s.value === id)
              )}
              onChange={(selected) =>
                handleChange(
                  'servicios',
                  selected.map((s) => s.value)
                )
              }
              placeholder='Select services'
              className='selectone'
            />
          )}
        </div>

        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Accommodation'}
        </button>
      </form>
    </>
  )
}

export default AddAlojamientoForm
