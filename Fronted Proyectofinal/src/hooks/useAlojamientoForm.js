import { useReducer, useState } from 'react'
import { formReducer, initialFormState } from '../useReducer/formReducer'

const useAlojamientoForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field, value) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { field, value } })
  }

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' })
  }

  const handleSubmit = async (url, token) => {
    setIsSubmitting(true)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(state)
      })

      if (!response.ok) throw new Error('Failed to submit form')

      alert('Accommodation successfully added!')
      resetForm()
    } catch (error) {
      console.error(error)
      alert('Error adding accommodation.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { state, handleChange, handleSubmit, isSubmitting }
}

export default useAlojamientoForm
