import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

function LoginUser() {
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    contrasena: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showRegisterAlert, setShowRegisterAlert] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setShowRegisterAlert(false)
    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:4000/api/v1/usuarios/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión')
      }

      // Guardar el token y redirigir
      localStorage.setItem('token', data.token)
      navigate('/') // Cambia por la ruta deseada después de iniciar sesión
    } catch (err) {
      setError(err.message)

      // Mostrar alerta si el error indica que el usuario no está registrado
      if (err.message.includes('Usuario no encontrado')) {
        setShowRegisterAlert(true)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2>LOGIN</h2>
        {error && <p className='error'>{error}</p>}
        {showRegisterAlert && (
          <p className='register-alert'>
            "You don't have a registered account. Please sign up to access."
          </p>
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
        <button type='submit' className='login-button' disabled={loading}>
          {loading ? 'Loading...' : 'Log in'}
        </button>
      </form>
    </div>
  )
}

export default LoginUser
