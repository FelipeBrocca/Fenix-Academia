import React from 'react'
import { Link } from 'react-router-dom'
import TrainingsHome from '../components/Trainings/TrainingsHome'
import SecureAlert from '../components/SecureAlert/SecureAlert'

const Home = () => {


  return (
    <main className='home-main'>
      <TrainingsHome />
      <div className='buttons-home-container'>
      <Link to='/jugador/listado' className='button-home-to'>
        Jugadores
      </Link>
      <Link to='/entrenadores/listado' className='button-home-to'>Entrenadores</Link>
      </div>
      <SecureAlert />
    </main>
  )
}

export default Home