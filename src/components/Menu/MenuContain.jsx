import React from 'react'
import { Link } from 'react-router-dom'

const MenuContain = () => {
  return (
    <ul className='menu-list'>
        <li><Link>Entrenamientos</Link></li>
        <li><Link to={'/jugador/listado'}>Jugadores</Link></li>
        <li><Link to={'/entrenadores/listado'}>Entrenadores</Link></li>
        <li><Link to={'/finanzas'}>Finanzas</Link></li>
    </ul>
  )
}

export default MenuContain