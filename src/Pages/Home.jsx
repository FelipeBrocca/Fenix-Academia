import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {


  return (
    <main>
      <Link to='/jugador/listado'>Ver jugadores</Link>
      <Link to='/entrenadores/listado'>Ver entrenadores</Link>
    </main>
  )
}

export default Home