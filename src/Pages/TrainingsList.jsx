import React from 'react'
import { Link } from 'react-router-dom'
import ListTrainings from '../components/Trainings/ListTrainings'
import CreateTrainingModal from '../components/Trainings/CreateTrainingModal'


const TrainingsList = () => {

    return (
        <main className='list-container'>
            <div className='top-list-page'>
                <Link className='back-to-list' to='/'>Volver</Link>
                <CreateTrainingModal />
            </div>
            <h2>Lista de entrenamientos</h2>
            <ListTrainings />
        </main>
    )
}

export default TrainingsList