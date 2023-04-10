import React from 'react'
import CoachesList from '../components/CoachesList/CoachesList'
import CreateCoachModal from '../components/CreateCoach/CreateCoachModal'

const CoachesPage = () => {
  return (
    <main>
      <div className='list-container'>
      <CreateCoachModal /> 
      <CoachesList />
      </div>
    </main>
  )
}

export default CoachesPage