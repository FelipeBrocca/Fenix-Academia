import React from 'react'
import CoachesList from '../components/CoachesList/CoachesList'
import CreateCoachModal from '../components/CreateCoach/CreateCoachModal'
import { Link } from 'react-router-dom'

const CoachesPage = () => {
  return (
    <main>
      <div className='list-container'>
        <div className='top-list-page'>
          <Link className='back-to-list' to='/'>Volver</Link>
          <CreateCoachModal />
        </div>
        <CoachesList />
      </div>
    </main>
  )
}

export default CoachesPage