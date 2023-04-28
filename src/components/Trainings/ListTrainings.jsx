import React from 'react'
import { useTrainings } from '../../context/TrainingsContext'
import TrainingItem from './TrainingItem'

const ListTrainings = () => {

    const { trainings, passedTrainings } = useTrainings()

    return (
        <>
            <ul className='trainings-list'>
                {
                    trainings.map(training => (
                        <TrainingItem key={training._id} training={training} />
                    ))
                }
            </ul>
            <h2>Entrenamientos pasados</h2>
            <ul className='trainings-list'>
                {
                    passedTrainings.map(training => (
                        <TrainingItem key={training._id} training={training} />
                    ))
                }
            </ul>
        </>
    )
}

export default ListTrainings