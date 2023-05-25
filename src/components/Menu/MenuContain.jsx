import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const MenuContain = () => {

  const [showFinances, setShowFinances] = useState(false)

  const handleFinances = () => {
    setShowFinances(showFinances => !showFinances)
  }

  return (
    <ul className='menu-list'>
      <li><Link to='/entrenamientos'>Entrenamientos</Link></li>
      <li><Link to={'/jugador/listado'}>Jugadores</Link></li>
      <li><Link to={'/entrenadores/listado'}>Entrenadores</Link></li>
      <li><button className={`button-finances-menu ${showFinances ? 'green' : ''}`} onClick={handleFinances}>Administrar<span className={`arrow-menu ${showFinances ? 'show' : ''}`}>&#10094;</span></button></li>
      <ul className={`finances-list-menu ${showFinances ? 'show' : ''}`} >
        <li><Link onClick={handleFinances} to={'/finanzas'} state={{ admin: { value: 0, label: 'Entrenadores' } }}>Administrar entrenadores</Link></li>
        <li><Link onClick={handleFinances} to={'/finanzas'} state={{ admin: { value: 1, label: 'Jugadores' } }}>Administrar jugadores</Link></li>
        <li><Link onClick={handleFinances} to={'/finanzas'} state={{ admin: { value: 2, label: 'Finanzas' } }}>Administrar finanzas</Link></li>
      </ul>
    </ul>
  )
}

export default MenuContain