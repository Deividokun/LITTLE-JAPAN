const useRegisterApi = () => {
  const registerUser = async (formData) => {
    const response = await fetch(
      'http://localhost:4000/api/v1/usuarios/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Error al registrar usuario')
    }

    return data
  }

  return { registerUser }
}

export default useRegisterApi
