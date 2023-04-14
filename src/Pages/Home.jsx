import React from 'react'
import { Link } from 'react-router-dom'
import TrainingsHome from '../components/Trainings/TrainingsHome'

const Home = () => {


  return (
    <main>
      <TrainingsHome />
      <div className='buttons-home-container'>
      <Link to='/jugador/listado' className='button-home-to'>
        Ver jugadores
      </Link>
      <Link to='/entrenadores/listado' className='button-home-to'>Ver entrenadores</Link>
      </div>
    </main>
  )
}

export default Home