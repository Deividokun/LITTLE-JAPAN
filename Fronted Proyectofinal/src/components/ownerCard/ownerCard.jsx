import React from 'react'
import './ownerCard.css'

function OwnerCard({
  imagenPropietario,
  nombreUsuario,
  experienciaUsuario,
  valoracionUsuario,
  telefonoUsuario
}) {
  return (
    <article className='ownerCard'>
      <div className='owner-header'>
        <img src={imagenPropietario} alt='owner' />
        <h3>{nombreUsuario}</h3>
      </div>
      <div className='owner-info'>
        <p className='dates'>
          <strong>Experience:</strong> {experienciaUsuario} years
        </p>
        <p className='rating dates'>
          <strong>Rating:</strong> {valoracionUsuario} ★
        </p>
        <p className='dates'>
          <strong>Telephone:</strong> {telefonoUsuario}
        </p>
      </div>
    </article>
  )
}

export default OwnerCard
