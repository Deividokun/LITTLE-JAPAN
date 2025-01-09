import React from 'react'
import { useNavigate } from 'react-router-dom'
import useRegisterForm from '../../hooks/useRegisterForm'
import './register.css'

function RegisterUser() {
  const navigate = useNavigate()
  const { state, handleChange, handleSubmit } = useRegisterForm(navigate)
  const { formData, loading, error, success } = state

  return (
    <div className='register-container'>
      <form onSubmit={handleSubmit} className='register-form'>
        <h2>User Registration</h2>
        {error && <p className='error'>{error}</p>}
        {success && (
          <p className='success'>Registration successful. Redirecting...</p>
        )}

        <div className='form-group'>
          <label htmlFor='nombreUsuario'>Username:</label>
          <input
            type='text'
            id='nombreUsuario'
            name='nombreUsuario'
            value={formData.nombreUsuario}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='contrasena'>Password:</label>
          <input
            type='password'
            id='contrasena'
            name='contrasena'
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='nombreCompleto'>Full Name:</label>
          <input
            type='text'
            id='nombreCompleto'
            name='nombreCompleto'
            value={formData.nombreCompleto}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='experiencia'>Experience:</label>
          <input
            type='number'
            id='experiencia'
            name='experiencia'
            value={formData.experiencia}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='imagenUsuario'>Profile Picture URL:</label>
          <input
            type='text'
            id='imagenUsuario'
            name='imagenUsuario'
            value={formData.imagenUsuario}
            onChange={handleChange}
            placeholder='Enter image URL'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='tipoDocumento'>Document Type:</label>
          <select
            id='tipoDocumento'
            name='tipoDocumento'
            value={formData.tipoDocumento}
            onChange={handleChange}
            required
          >
            <option value='DNI'>DNI</option>
            <option value='Pasaporte'>Passport</option>
            <option value='Otro'>Other</option>
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='numeroDocumento'>Document Number:</label>
          <input
            type='text'
            id='numeroDocumento'
            name='numeroDocumento'
            value={formData.numeroDocumento}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='telefono'>Phone:</label>
          <input
            type='text'
            id='telefono'
            name='telefono'
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='edad'>Age:</label>
          <input
            type='number'
            id='edad'
            name='edad'
            value={formData.edad}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type='submit' className='register-button' disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default RegisterUser
